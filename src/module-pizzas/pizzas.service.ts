import { PaginatedDto, paginateUtils } from '@models/pagination.model';
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
import { IngredientsDocument } from '@schemas/ingredients.schema';

@Injectable()
export class PizzasService {

  constructor(
    @InjectModel(Pizza.name) private _db: Model<PizzaDocument>,
    @Inject(LangService) private _ls: LangService,
    private _s3: AwsS3Service
  ) {

  }

  async create(createPizzaDto: CreatePizzaDto, file: Express.Multer.File): Promise<PizzaDocument> {

    const data = {
      ...createPizzaDto,
      ingredients: createPizzaDto.ingredientsIds,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    if (file) {
      const img = await this._s3.upload(file);
      createPizzaDto.image = img.Location;
      const pizza = new this._db({ ...data, image: img.Location }).save();
      return pizza;
    } else {
      const pizza = new this._db({ ...data }).save();
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
    const pizzas: PizzaDocument[] = await paginateUtils(this._db, query).populate('ingredients');
    return {
      total: await this._db.estimatedDocumentCount({}) || 0,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 20,
      result: pizzas.map(p => new ModelPizzaPublic(new ModelPizza(p), this._ls.getLang()))
    }
  }


  findOne(id: string): Promise<ModelPizzaPublic> {
    return this._db.findById(id).populate('ingredients').exec().then((p: PizzaDocument & { ingredients: IngredientsDocument }) => new ModelPizzaPublic({ ...p, ingredients: p._doc.ingredients as IngredientsDocument[] }, this._ls.getLang()));
  }

  async findOnePublic(id: string): Promise<ModelPizzaPublic> {
    const p = await this._db.findById(id).exec();
    return new ModelPizzaPublic({...p._doc, ingredients:p._doc.ingredients as IngredientsDocument[]}, this._ls.getLang());
  }

  update(id: string, updatePizzaDto: UpdatePizzaDto) {
    return this._db.exists(({ _id: id }))
      .then(exist => {

        const data = {
          ...updatePizzaDto,
          ingredients: updatePizzaDto.ingredientsIds,
          updatedAt: new Date(),
        }
        if (exist) {
          return this._db.findByIdAndUpdate(id, {
            $set: data
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

