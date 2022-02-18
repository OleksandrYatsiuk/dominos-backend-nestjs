import { ModelSizes } from '@models/item-sizes.model';
import { ModelLanguage } from '@models/language.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type PizzaDocument = Pizza & Document & { _doc: Pizza };

@Schema({ versionKey: false })
export class ItemSize {
    @Prop({ default: null, required: false })
    small: number;
    @Prop({ default: null, required: false })
    middle: number;
    @Prop({ default: null, required: false })
    big: number;
}

@Schema({ versionKey: false })
export class Pizza {

    @Prop()
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, type: ModelLanguage, required: true })
    name: ModelLanguage;

    @Prop({ type: ModelSizes, required: true, default: new ModelSizes() })
    price: ModelSizes;

    @Prop({ type: ModelSizes, default: new ModelSizes(), required: true })
    size: ModelSizes

    @Prop({ default: [] })
    ingredients: Array<mongoose.Types.ObjectId>;

    @Prop({ default: '', ref: 'PizzaStatuses' })
    categoryId: mongoose.Types.ObjectId;

    @Prop({ default: null })
    image: string;

    @Prop({ default: new Date(), type: Date })
    createdAt: Date;

    @Prop({ default: new Date(), type: Date })
    updatedAt: Date;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);