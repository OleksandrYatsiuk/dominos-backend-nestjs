import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { Ingredients, IngredientsSchema } from '@schemas/ingredients.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageModule } from 'src/module-language/language.module';

@Module({
  controllers: [IngredientsController],
  imports: [MongooseModule.forFeature([{ name: Ingredients.name, schema: IngredientsSchema }]), LanguageModule],
  providers: [IngredientsService]
})
export class IngredientsModule {}
