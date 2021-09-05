import { ModelLanguage } from '@models/language.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ModelPizzaStatus } from 'src/pizza-statuses/entities/pizza-status.entity';

export type PizzaStatusDocument = ModelPizzaStatus & Document & { _doc: ModelPizzaStatus };

@Schema({ versionKey: false })
export class PizzaStatuses {

    @Prop()
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, type: ModelLanguage, required: true })
    name: ModelLanguage;

    @Prop({ default: 0 })
    status: number;

    @Prop({ default: new Date(), type: Date })
    createdAt: Date;

    @Prop({ default: new Date(), type: Date })
    updatedAt: Date;
}

export const PizzaStatusesSchema = SchemaFactory.createForClass(PizzaStatuses);