import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { AwsS3Service } from '@services/aws.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from '@schemas/shops.schema';
import { MulterModule } from '@nestjs/platform-express';
import { LanguageModule } from 'src/module-language/language.module';

@Module({
  controllers: [ShopsController],
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    MulterModule.registerAsync({ useFactory: () => ({}) }),
    LanguageModule
  ],
  providers: [ShopsService, AwsS3Service]
})
export class ShopsModule { }
