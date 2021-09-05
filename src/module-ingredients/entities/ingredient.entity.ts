import { IsMultiRequired } from "@decorators/validation";
import { ModelLanguage } from "@models/language.model";
import { ApiProperty } from "@nestjs/swagger";
import { IngredientsDocument } from "@schemas/ingredients.schema";
import { Transform } from "class-transformer";

export class ModelIngredient implements Partial<IngredientsDocument> {
    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;

    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    @Transform(({ value }) => JSON.parse(value))
    @IsMultiRequired({ each: false })
    name: ModelLanguage;

    @ApiProperty({ type: String, default: new Date() })
    createdAt: Date;

    @ApiProperty({ type: String, default: new Date() })
    updatedAt: Date;

    constructor({ _id = null, name = null, createdAt = null, updatedAt = null }) {
        this.id = _id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
