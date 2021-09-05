import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PizzasController } from './pizzas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PizzaSchema, Pizza } from '@schemas/pizzas.schema';
import { MulterModule } from '@nestjs/platform-express/multer';
import { AwsS3Service } from '@services/aws.service';
import { PizzasPublicController } from './pizzas-public.controller';
import { LanguageModule } from 'src/module-language/language.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pizza.name, schema: PizzaSchema }]),
    MulterModule.registerAsync({ useFactory: () => ({}) }),
    LanguageModule
  ],
  controllers: [PizzasController, PizzasPublicController],
  providers: [PizzasService, AwsS3Service],
})
export class PizzasModule { }
