import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Drinks, drinksSchema } from '@schemas/drinks.schema';
import { LanguageModule } from 'src/module-language/language.module';
import { AwsS3Service } from '@services/aws.service';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  controllers: [DrinksController],
  imports: [
    MongooseModule.forFeature([{ name: Drinks.name, schema: drinksSchema }]),
    MulterModule.registerAsync({ useFactory: () => ({}) }),
    LanguageModule
  ],
  providers: [DrinksService, AwsS3Service]
})
export class DrinksModule { }
