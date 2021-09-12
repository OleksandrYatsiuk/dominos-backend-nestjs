import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotions, PromotionsSchema } from '@schemas/promotions.schema';
import { AwsS3Service } from '@services/aws.service';
import { PromotionsPublicController } from './promotions-public/promotions-public.controller';
import { LanguageModule } from 'src/module-language/language.module';

@Module({
  imports: [LanguageModule, MongooseModule.forFeature([{ name: Promotions.name, schema: PromotionsSchema }])],
  controllers: [PromotionsController, PromotionsPublicController],
  providers: [PromotionsService, AwsS3Service]
})
export class PromotionsModule { }
