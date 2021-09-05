import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredients, IngredientsDocument } from '@schemas/ingredients.schema';
import { Model } from 'mongoose';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { ModelIngredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(@InjectModel(Ingredients.name) private _db: Model<IngredientsDocument>) { }

  async create(createIngredientDto: CreateIngredientDto): Promise<ModelIngredient> {
    const ingredient = await new this._db(createIngredientDto).save();
    return new ModelIngredient(ingredient);
  }

  findAll(): Promise<ModelIngredient[]> {
    return this._db.find().then(item => item.map(s => new ModelIngredient(s)));
  }

  findOne(id: string): Promise<ModelIngredient> {
    return this._db.findById(id).then(item => new ModelIngredient(item));
  }

  update(id: string, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: string) {
    return `This action removes a #${id} ingredient`;
  }
}
