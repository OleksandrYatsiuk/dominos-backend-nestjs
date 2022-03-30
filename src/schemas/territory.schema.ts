import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


export type TerritoryDocument = Territories & mongoose.Document & { _doc: Territories };

@Schema({ versionKey: false })
export class Territories {

    @Prop()
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, required: false })
    name: string;

    @Prop({ required: false, default: [] })
    coords: Array<number>;

    @Prop({ required: false, default: {} })
    styles: string;

    @Prop({ default: Date })
    createdAt: Date;

    @Prop({ default: Date })
    updatedAt: Date;
}

export const territorySchema = SchemaFactory.createForClass(Territories);