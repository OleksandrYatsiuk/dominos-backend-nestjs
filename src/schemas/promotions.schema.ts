import { ModelLanguage } from '@models/language.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


export type PromotionsDocument = Promotions & mongoose.Document & { _doc: Promotions };

@Schema({ versionKey: false })
export class Promotions {

    @Prop({})
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, required: true })
    name: ModelLanguage;

    @Prop({ default: null, required: true })
    description: ModelLanguage;

    @Prop({ default: null })
    image: string;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ default: null })
    startedAt: Date;

    @Prop({ default: null })
    endedAt: Date;

    @Prop({ default: Date })
    createdAt: Date;

    @Prop({ default: Date })
    updatedAt: Date;
}

export const PromotionsSchema = SchemaFactory.createForClass(Promotions);