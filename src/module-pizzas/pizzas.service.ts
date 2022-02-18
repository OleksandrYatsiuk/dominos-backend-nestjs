import { PaginatedDto, paginationUtils } from '@models/pagination.model';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PizzaDocument, Pizza } from '@schemas/pizzas.schema';
import { AwsS3Service } from '@services/aws.service';
import { LangService } from 'src/module-language/lang.service';
import { Model } from 'mongoose';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { ModelPizza } from './entities/pizza.entity';
import { ModelPizzaPublic } from './entities/public-pizza.entity';
import { PizzaStatusDocument } from '@schemas/pizza-statuses.schema';

@Injectable()
export class PizzasService {

  constructor(
    @InjectModel(Pizza.name) private _db: Model<PizzaDocument>,
    @Inject(LangService) private _ls: LangService,
    private _s3: AwsS3Service
  ) { }

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
    const pizzas = await paginationUtils(this._db, query, {}, query.sort, 'categoryId');
    return {
      ...pizzas,
      result: pizzas.result.map((p: any) => {
        p.category = p.categoryId as PizzaStatusDocument;
        return new ModelPizza(p);
      })
    }

  }
  async findAllPublic(query: any = {}): Promise<PaginatedDto<ModelPizzaPublic[]>> {
    const pizzas = await paginationUtils(this._db, query, {}, query.sort);
    return {
      ...pizzas,
      result: pizzas.result.map(p => new ModelPizzaPublic({ ...p._doc, name: this._ls.getValue(p._doc.name) }))
    };
  }
  findOne(id: string): Promise<PizzaDocument> {
    return this._db.findById(id).exec();
  }
  async findOnePublic(id: string): Promise<ModelPizzaPublic> {
    const p = await this._db.findById(id).exec();
    return new ModelPizzaPublic({ ...p._doc, name: this._ls.getValue(p._doc.name) });
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
  async uploadImage(id: string, file: Express.Multer.File): Promise<ModelPizza | NotFoundException> {
    const drink = await this._db.findById(id);

    if (!drink) {
      throw new NotFoundException('Pizza was not found');
    }

    if (drink.image) {
      this._s3.removeFile(drink.image);
    }

    const img = await this._s3.upload(file);
    drink.image = img.Location;
    drink.updatedAt = new Date();

    return this._db.findByIdAndUpdate(id, {
      $set: drink
    }, { new: true }).exec()
      .then(record => new ModelPizza(record))
  }
}

