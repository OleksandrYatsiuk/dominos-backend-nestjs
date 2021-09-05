import { ModelLanguage } from '@models/language.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ModelIngredient } from 'src/module-ingredients/entities/ingredient.entity';

export type IngredientsDocument = ModelIngredient & Document & { _doc: ModelIngredient };

@Schema({ versionKey: false })
export class Ingredients {

    @Prop()
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, type: ModelLanguage, required: true })
    name: ModelLanguage;

    @Prop({ default: new Date(), type: Date })
    createdAt: Date;

    @Prop({ default: new Date(), type: Date })
    updatedAt: Date;
}

export const IngredientsSchema = SchemaFactory.createForClass(Ingredients);