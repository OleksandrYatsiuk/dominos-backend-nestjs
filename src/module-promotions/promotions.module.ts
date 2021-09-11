import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotions, PromotionsSchema } from '@schemas/promotions.schema';
import { AwsS3Service } from '@services/aws.service';
import { PromotionsPublicController } from './promotions-public/promotions-public.controller';
import { LangService } from 'src/module-language/lang.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Promotions.name, schema: PromotionsSchema }])],
  controllers: [PromotionsController, PromotionsPublicController],
  providers: [PromotionsService, AwsS3Service, LangService]
})
export class PromotionsModule { }
