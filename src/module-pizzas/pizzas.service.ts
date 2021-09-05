import { PaginatedDto, paginateUtils } from '@models/pagination.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PizzaDocument, Pizza } from '@schemas/pizzas.schema';
import { AwsS3Service } from '@services/aws.service';
import { LangService } from 'src/module-language/lang.service';
import { Model } from 'mongoose';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { ModelPizza } from './entities/pizza.entity';
import { ModelPizzaPublic } from './entities/public-pizza.entity';

@Injectable()
export class PizzasService {

  constructor(
    @InjectModel(Pizza.name) private _db: Model<PizzaDocument>,
    private _s3: AwsS3Service,
    private _ls: LangService
  ) {

  }

  async create(createPizzaDto: CreatePizzaDto, file: Express.Multer.File): Promise<PizzaDocument> {

    if (file) {
      const img = await this._s3.upload(file);
      createPizzaDto.image = img.Location;
      const pizza = new this._db(createPizzaDto).save();
      return pizza;
    } else {
      const pizza = new this._db(createPizzaDto).save();
      return pizza;
    }


  }

  async findAll(query: any = {}): Promise<PaginatedDto<ModelPizza[]>> {
    const pizzas = await paginateUtils(this._db, query);
    return {
      total: await this._db.estimatedDocumentCount({}) || 0,
      page: Number(query.page) | 1,
      limit: Number(query.limit) || 20,
      result: pizzas.map(p => new ModelPizza(p))
    };
  }
  async findAllPublic(query: any = {}): Promise<PaginatedDto<ModelPizzaPublic[]>> {
    const pizzas: PizzaDocument[] = await paginateUtils(this._db, query);
    return {
      total: await this._db.estimatedDocumentCount({}) || 0,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 20,
      result: pizzas.map(p => new ModelPizzaPublic({ ...p._doc, name: p._doc.name[this._ls.getLang()] }))
    };
  }


  findOne(id: string): Promise<PizzaDocument> {
    return this._db.findById(id).exec();
  }

  update(id: string, updatePizzaDto: UpdatePizzaDto) {
    return this._db.exists(({ _id: id }))
      .then(exist => {
        if (exist) {
          return this._db.findByIdAndUpdate(id, {
            $set: { ...updatePizzaDto, updatedAt: new Date() }
          },
            { new: true }).exec().then(record => new ModelPizza(record))
        } else {
          throw new Error('Pizza not found');
        }
      })
  }

  remove(id: string): Promise<any> {
    return this._db.findById(id).then(pizza => {
      if (pizza) {
        if (pizza.image) {
          this._s3.removeFile(pizza.image).then(() => this._db.deleteOne({ _id: id }).exec())
        } else {
          return this._db.deleteOne({ _id: id }).exec();
        }
      } else {
        throw new NotFoundException('Pizza was not found');
      }
    });
  }
}

