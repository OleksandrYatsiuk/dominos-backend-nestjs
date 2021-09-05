import { PaginatedDto, paginateUtils } from '@models/pagination.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Promotions, PromotionsDocument } from '@schemas/promotions.schema';
import { Model } from 'mongoose';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ModelPromotion } from './entities/promotion.entity';

@Injectable()
export class PromotionsService {
  constructor(@InjectModel(Promotions.name) private _db: Model<PromotionsDocument>) {

  }
  create(createPromotionDto: CreatePromotionDto) {
    return 'This action adds a new promotion';
  }

  async findAll(query?: any): Promise<PaginatedDto<ModelPromotion[]>> {
    const promotions = await paginateUtils(this._db, query);
    return {
      total: await this._db.estimatedDocumentCount({}) || 0,
      page: Number(query.page) | 1,
      limit: Number(query.limit) || 20,
      result: promotions.map(p => new ModelPromotion(p))
    };
  }

  findOne(id: string): Promise<ModelPromotion> {
    return this._db.findById(id).exec().then(d => new ModelPromotion(d));
  }

  update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return `This action updates a #${id} promotion`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
