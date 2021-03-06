import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { CreateTerritoryVersionDto } from "src/module-territory-versions/dto/create-territory-version.dto";

export class CreateTerritoryDto extends CreateTerritoryVersionDto {

    @ApiProperty({ required: false, type: String })
    name: string;

    @Transform(({ value }: { value: string }) => Array.isArray(value) ? value : value.split(',').filter(id => id))
    @ApiProperty({ required: false, type: Array })
    coords: Array<number>;

    @Transform(({ value }) => JSON.stringify(value))
    @ApiProperty({ required: false, type: Object })
    styles: { [x: string]: string };

    @ApiProperty({ type: Number, default: new Date(), readOnly: true })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date(), readOnly: true })
    updatedAt: Date;
}
