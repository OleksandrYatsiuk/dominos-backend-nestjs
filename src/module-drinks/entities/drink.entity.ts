import { DrinksDocument } from "@schemas/drinks.schema";
import { ApiProperty } from "@nestjs/swagger";
import { ModelLanguage } from "@models/language.model";
import { Transform } from "class-transformer";
import { IsMultiRequired } from "@decorators/validation";
import { ModelSizes } from "@models/item-sizes.model";
import { DrinksCategory } from "src/enums/drinks.enum";

export class ModelDrinks implements Partial<DrinksDocument> {

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;

    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    @IsMultiRequired({ each: false })
    name: ModelLanguage;

    @ApiProperty({ required: false, type: String, default: null })
    image: string;

    @ApiProperty({ type: ModelSizes, default: new ModelSizes() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    price: ModelSizes;

    @ApiProperty({ type: DrinksCategory, default: null, required: true, enum: [DrinksCategory.BEER, DrinksCategory.JUICE, DrinksCategory.WATER] })
    category: DrinksCategory;

    @ApiProperty({ type: ModelSizes, default: new ModelSizes() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    size: ModelSizes;

    @ApiProperty({ type: Date, default: new Date() })
    createdAt: Date;

    @ApiProperty({ type: Date, default: new Date() })
    updatedAt: Date;

    constructor({
        _id = null,
        name = null,
        image = null,
        category = null,
        price = new ModelSizes(),
        size = new ModelSizes(),
        updatedAt = null,
        createdAt = null
    }: Partial<DrinksDocument> = {}) {
        this.id = _id as string;
        this.name = name;
        this.category = category;
        this.price = new ModelSizes(price);
        this.size = new ModelSizes(size);
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}

