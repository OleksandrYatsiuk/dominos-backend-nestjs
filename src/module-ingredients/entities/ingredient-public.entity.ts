import { ELanguage } from "@models/language.model";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IngredientsDocument } from "@schemas/ingredients.schema";
import { ModelIngredient } from "./ingredient.entity";

export class ModelPublicIngredient extends OmitType(ModelIngredient, ['name']) {
    @ApiProperty({ required: true, type: String, default: "" })
    name: string;

    constructor({ _id = null, name = null, createdAt = null, updatedAt = null }: Partial<IngredientsDocument> = {}, lang: ELanguage) {
        super()
        this.id = _id;
        this.name = name[lang];
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
