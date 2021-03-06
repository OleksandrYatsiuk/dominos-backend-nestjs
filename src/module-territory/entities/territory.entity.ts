import { ApiProperty } from "@nestjs/swagger";
import { TerritoryDocument } from "@schemas/territory.schema";
import { ModelTerritoryVersion } from "src/module-territory-versions/entities/territory-version.entity";

export class Territory implements Partial<TerritoryDocument> {

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;

    @ApiProperty({ required: false, type: ModelTerritoryVersion })
    details: ModelTerritoryVersion;

    @ApiProperty({ type: Number, default: new Date() })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date() })
    updatedAt: Date;

    constructor({
        _id = null,
        details = null,
        createdAt = null,
        updatedAt = null
    }) {
        this.id = _id;
        this.details = details;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
