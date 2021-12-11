import { PaginatedDto, paginationUtils } from '@models/pagination.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Promotions, PromotionsDocument } from '@schemas/promotions.schema';
import { AwsS3Service } from '@services/aws.service';
import { Model } from 'mongoose';
import { LangService } from 'src/module-language/lang.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ModelPublicPromotion } from './entities/promotion-public.entity ';
import { ModelPromotion } from './entities/promotion.entity';

@Injectable()
export class PromotionsService {
  constructor(
    private _s3: AwsS3Service,
    @InjectModel(Promotions.name) private _db: Model<PromotionsDocument>,
    private _ls: LangService
  ) {

  }
  async create(createPromotionDto: CreatePromotionDto, file: Express.Multer.File) {
    if (file) {
      const img = await this._s3.upload(file);
      createPromotionDto.image = img.Location;
      const promotion = new this._db(createPromotionDto).save();
      return promotion;
    } else {
      const promotion = new this._db(createPromotionDto).save();
      return promotion;
    }
  }

  async findAll(query?: any): Promise<PaginatedDto<ModelPromotion[]>> {

    const promotions = await paginationUtils(this._db, query, {}, query.sort);
    return {
      ...promotions,
      result: promotions.result.map(p => new ModelPromotion(p))
    };
  }

  async findAllPublic(query?: any): Promise<PaginatedDto<ModelPublicPromotion[]>> {
    const promotions = await paginationUtils(this._db, query, {}, query?.sort);

    return {
      ...promotions,
      result: promotions.result.map(p => new ModelPublicPromotion({
        ...p._doc,
        name: this._ls.getValue(p._doc.name),
        description: this._ls.getValue(p._doc.description)
      }))
    };
  }

  findOne(id: string): Promise<ModelPromotion> {
    return this._db.findById(id).exec().then(d => new ModelPromotion(d));
  }
  findOnePublic(id: string): Promise<ModelPublicPromotion> {
    return this._db.findById(id).exec().then(p => new ModelPublicPromotion({
      ...p._doc,
      name: this._ls.getValue(p._doc.name),
      description: this._ls.getValue(p._doc.description)
    }));
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this._db.findById(id);

    if (updatePromotionDto.image === null) {
      await this._s3.removeFile(promotion.image);
    }

    if (promotion) {
      return this._db.findByIdAndUpdate(id, { $set: { ...updatePromotionDto, image: updatePromotionDto.image, updatedAt: new Date() } }, { new: true });
    } else {
      throw new Error('Promotion not found');
    }
  }

  upload(id: string, file: Express.Multer.File = null): Promise<PromotionsDocument> {
    return this._db.findById(id)
      .then(promotion => {
        if (promotion) {

          if (promotion.image) {
            return this._s3.removeFile(promotion.image)
              .then(() => this._s3.upload(file).then(image => this._db.findByIdAndUpdate(id, { image: image.Location }, { new: true })))
          }
          return this._s3.upload(file).then(image => this._db.findByIdAndUpdate(id, { image: image.Location }, { new: true }))
        } else {
          throw new Error('Promotion not found');
        }
      });
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
        throw new NotFoundException('Promotion was not found');
      }
    });
  }
}
