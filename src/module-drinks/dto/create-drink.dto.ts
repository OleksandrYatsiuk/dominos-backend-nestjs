import { ApiProperty } from "@nestjs/swagger";
import { ModelLanguage } from "@models/language.model";
import { Transform } from "class-transformer";
import { IsMultiRequired } from "@decorators/validation";
import { ModelSizes } from "@models/item-sizes.model";
import { DrinksTypes } from "src/enums/drinks.enum";

export class CreateDrinkDto {

    @ApiProperty({ required: false, type: String, readOnly: true })
    readonly id: string;

    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    @IsMultiRequired({ each: false })
    name: ModelLanguage;


    @ApiProperty({ required: false, type: String, format: 'binary', default: null })
    image: string;

    @ApiProperty({ type: ModelSizes, default: new ModelSizes() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    price: ModelSizes;

    @ApiProperty({ type: ModelSizes, default: new ModelSizes() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    size: ModelSizes;

    @ApiProperty({ type: DrinksTypes, default: null, required: true, enum: [DrinksTypes.BEER, DrinksTypes.JUICE, DrinksTypes.WATER] })
    type: DrinksTypes;

    @ApiProperty({ type: Date, default: new Date() })
    createdAt: Date;

    @ApiProperty({ type: Date, default: new Date() })
    updatedAt: Date;
}
