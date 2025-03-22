import { ModelSizes } from '@models/item-sizes.model';
import { ModelLanguage } from '@models/language.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { DrinksCategory } from 'src/enums/drinks.enum';


export type DrinksDocument = Drinks & mongoose.Document & { _doc: Drinks };

@Schema({ versionKey: false })
export class Drinks {

    @Prop()
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, required: true })
    name: ModelLanguage;

    @Prop({ default: null })
    image: string;

    @Prop({ type: ModelSizes, required: true, default: new ModelSizes() })
    price: ModelSizes;

    @Prop({ type: ModelSizes, default: new ModelSizes(), required: true })
    size: ModelSizes;

    @Prop({ type: Number, default: null, required: true })
    category: DrinksCategory;

    @Prop({ default: Date })
    createdAt: Date;

    @Prop({ default: Date })
    updatedAt: Date;
}

export const drinksSchema = SchemaFactory.createForClass(Drinks);