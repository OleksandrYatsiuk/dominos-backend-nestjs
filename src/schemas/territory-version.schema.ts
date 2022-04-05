import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ModelTerritoryVersion } from 'src/module-territory-versions/entities/territory-version.entity';

export type TerritoryVersionDocument = TerritoryVersions & mongoose.Document & { _doc: ModelTerritoryVersion };

@Schema({ versionKey: false, id: true })
export class TerritoryVersions {

    // @Prop({})
    // readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, required: false })
    name: string;

    @Prop({ required: false, default: [] })
    coords: Array<number>;

    @Prop({ required: false, default: {} })
    styles: string;

    @Prop({ required: true, ref: 'Territories' })
    territory: mongoose.Types.ObjectId;

    @Prop({ default: Date })
    createdAt: Date;

    @Prop({ default: Date })
    updatedAt: Date;
}

export const territoryVersionSchema = SchemaFactory.createForClass(TerritoryVersions);