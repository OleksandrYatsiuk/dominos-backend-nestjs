import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pizza, PizzaSchema } from '@schemas/pizzas.schema';
import { Drinks, drinksSchema } from '@schemas/drinks.schema';
import { LanguageModule } from 'src/module-language/language.module';

@Module({
  controllers: [ProductsController],
  imports: [
    LanguageModule,
    MongooseModule.forFeature([
      { name: Pizza.name, schema: PizzaSchema },
      { name: Drinks.name, schema: drinksSchema }
    ])],
  providers: [ProductsService,]
})
export class ProductsModule { }
