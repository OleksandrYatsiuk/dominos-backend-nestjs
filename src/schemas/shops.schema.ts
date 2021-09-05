import { ModelCoords } from '@models/coords.model';
import { ModelLanguage } from '@models/language.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ModelShop } from 'src/module-shops/entities/shop.entity';


export type ShopsDocument = ModelShop & mongoose.Document & { _doc: ModelShop };

@Schema({ versionKey: false })
export class Shop {

    @Prop({})
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, type: ModelLanguage, required: true })
    address: ModelLanguage;

    @Prop({ default: null, type: ModelCoords, required: true })
    coords: ModelCoords;

    @Prop({ default: null })
    image: string;

    @Prop({ default: new Date(), type: Date })
    createdAt: Date;

    @Prop({ default: new Date(), type: Date })
    updatedAt: Date;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);