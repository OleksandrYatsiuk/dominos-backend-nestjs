import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop, ShopsDocument } from '@schemas/shops.schema';
import { AwsS3Service } from '@services/aws.service';
import { Model } from 'mongoose';
import { LangService } from 'src/module-language/lang.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ModelShop } from './entities/shop.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name) private _db: Model<ShopsDocument>,
    private _s3: AwsS3Service,
    private _ls: LangService
  ) {

  }

  async create(createShopDto: CreateShopDto, file: Express.Multer.File): Promise<any> {
    if (file) {
      const img = await this._s3.upload(file);
      createShopDto.image = img.Location;
      const pizza = new this._db(createShopDto).save();
      return pizza;
    } else {
      const pizza = new this._db(createShopDto).save();
      return pizza;
    }
  }

  findAll(): Promise<ModelShop[]> {
    return this._db.find().then(items => items.map(shop => new ModelShop(shop)));
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: string): Promise<any> {
    return this._db.findById(id).then(shop => {
      if (shop) {
        if (shop.image) {
          this._s3.removeFile(shop.image).then(() => this._db.deleteOne({ _id: id }).exec())
        } else {
          return this._db.deleteOne({ _id: id }).exec();
        }
      } else {
        throw new NotFoundException('Pizza was not found');
      }
    });
  }
}
