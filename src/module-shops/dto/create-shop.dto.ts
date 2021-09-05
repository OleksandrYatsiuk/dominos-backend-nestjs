import { IsMultiRequired } from "@decorators/validation";
import { ModelCoords } from "@models/coords.model";
import { ModelLanguage } from "@models/language.model";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateShopDto {

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string

    @ApiProperty({ required: true, type: ModelCoords, default: new ModelCoords() })
    @Transform(({ value }) => JSON.parse(value))
    coords: ModelCoords;

    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    @Transform(({ value }) => JSON.parse(value))
    @IsMultiRequired({ each: true })
    address: ModelLanguage;

    @ApiProperty({ required: false, type: String, format: 'binary', default: null })
    image: string;

}
