import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Drinks, DrinksDocument } from '@schemas/drinks.schema';
import { LangService } from 'src/module-language/lang.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AwsS3Service } from '@services/aws.service';
import { PaginatedDto, paginationUtils } from '@models/pagination.model';
import { ModelDrinks } from './entities/drink.entity';


@Injectable()
export class DrinksService {
  constructor(
    @InjectModel(Drinks.name) private _db: Model<DrinksDocument>,
    @Inject(LangService) private _ls: LangService,
    private _s3: AwsS3Service
  ) {

  }
  async create(createDrinkDto: CreateDrinkDto, file: Express.Multer.File) {
    createDrinkDto.createdAt = new Date();
    createDrinkDto.updatedAt = new Date();
    if (file) {
      const img = await this._s3.upload(file);
      createDrinkDto.image = img.Location;
      const drink = new this._db(createDrinkDto).save();
      return drink;
    } else {
      const drink = new this._db(createDrinkDto).save();
      return drink;
    }
  }

  async findAll(query): Promise<PaginatedDto<DrinksDocument[]>> {
    return await paginationUtils(this._db, query, {}, query.sort);
  }

  findOne(id: string): Promise<DrinksDocument> {
    return this._db.findById(id).then(drink => {
      if (!drink) {
        throw new NotFoundException('Drink was not found');
      }
      return drink;
    });
  }

  async update(id: string, updateDrinkDto: UpdateDrinkDto) {
    const drink = await this._db.findById(id);

    if (!drink) {
      return new NotFoundException('Drink not found');
    }

    if (updateDrinkDto.image === null && drink.image) {
      await this._s3.removeFile(drink.image);
      drink.image = null;
    }

    return this._db.findByIdAndUpdate(id, { $set: { ...updateDrinkDto, image: drink.image, updatedAt: new Date() } }, { new: true }).exec();
  }

  remove(id: string): Promise<any | NotFoundException> {
    return this._db.findById(id).then(drink => {
      if (drink) {
        if (drink.image) {
          this._s3.removeFile(drink.image).then(() => this._db.deleteOne({ _id: id }).exec())
        } else {
          return this._db.deleteOne({ _id: id }).exec();
        }
      } else {
        throw new NotFoundException('Drink was not found');
      }
    });
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<ModelDrinks | NotFoundException> {
    const drink = await this._db.findById(id);

    if (!drink) {
      throw new NotFoundException('Drink was not found');
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
      .then(record => new ModelDrinks(record))
  }
}
