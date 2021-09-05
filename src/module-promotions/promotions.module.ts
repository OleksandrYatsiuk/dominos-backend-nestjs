import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotions, PromotionsSchema } from '@schemas/promotions.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Promotions.name, schema: PromotionsSchema }])],
  controllers: [PromotionsController],
  providers: [PromotionsService]
})
export class PromotionsModule { }
