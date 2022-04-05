import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Territory } from 'src/module-territory/entities/territory.entity';


export type TerritoryDocument = Territories & mongoose.Document & { _doc: Territory };

@Schema({ versionKey: false })
export class Territories {

    // @Prop({})
    // readonly id: mongoose.Types.ObjectId;

    @Prop({ default: Date })
    createdAt: Date;

    @Prop({ default: Date })
    updatedAt: Date;
}

export const territorySchema = SchemaFactory.createForClass(Territories);