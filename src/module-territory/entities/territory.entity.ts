import { ApiProperty } from "@nestjs/swagger";
import { TerritoryDocument } from "@schemas/territory.schema";

export class Territory implements Partial<TerritoryDocument> {

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;

    @ApiProperty({ required: false, type: String })
    name: string;

    @ApiProperty({ required: false, type: Array })
    coords: number[];

    @ApiProperty({ required: false })
    styles: any;

    @ApiProperty({ type: Number, default: new Date() })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date() })
    updatedAt: Date;

    constructor({
        _id = null,
        name = null,
        coords = [],
        styles = '{}',
        createdAt = null,
        updatedAt = null

    }) {
        this.id = _id;
        this.name = name;
        this.coords = coords;
        this.styles = JSON.parse(styles);
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
