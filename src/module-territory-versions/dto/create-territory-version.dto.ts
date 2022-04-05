import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateTerritoryVersionDto {

    @ApiProperty({ required: false, type: String })
    name: string;

    @ApiProperty({ required: true, type: String })
    territory: string;

    @Transform(({ value }: { value: string }) => Array.isArray(value) ? value : value.split(',').filter(id => id))
    @ApiProperty({ required: false, type: Array })
    coords: number[];

    @ApiProperty({ required: false })
    styles: any;

    @ApiProperty({ type: Number, default: new Date(), readOnly: true })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date(), readOnly: true })
    updatedAt: Date;

}
