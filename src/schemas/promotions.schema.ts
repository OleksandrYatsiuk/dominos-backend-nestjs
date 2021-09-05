import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


export type PromotionsDocument = Promotions & mongoose.Document;

@Schema({ versionKey: false })
export class Promotions {

    @Prop({})
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, required: true })
    title: string;

    @Prop({ default: null, required: true })
    description: string;

    @Prop({ default: null })
    image: string;

    @Prop({ default: null })
    price: string;

    @Prop({ default: 0 })
    status: number;

    @Prop({ default: null })
    startedAt: Date;

    @Prop({ default: null })
    endedAt: Date;

    @Prop({ default: Date.now() })
    createdAt: number;

    @Prop({ default: Date.now() })
    updatedAt: number;
}

export const PromotionsSchema = SchemaFactory.createForClass(Promotions);