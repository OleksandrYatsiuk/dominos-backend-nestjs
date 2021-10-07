import { ModelSizes } from "@models/item-sizes.model";
import { ELanguage } from "@models/language.model";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IngredientsDocument, IngredientsSchema } from "@schemas/ingredients.schema";
import { ModelPublicIngredient } from "src/module-ingredients/entities/ingredient-public.entity";
import { ModelPizza } from "./pizza.entity";

export class ModelPizzaPublic extends OmitType(ModelPizza, ['name', 'ingredients']) {


    @ApiProperty({ required: true, type: String, default: 'name' })
    name: string;

    @ApiProperty({ required: true, type: [ModelPublicIngredient], default: [] })
    ingredients: ModelPublicIngredient[];


    constructor({
        _id = null,
        name = null,
        ingredients = [],
        category = null,
        image = null,
        createdAt = null,
        price = null,
        weight = null,
        updatedAt = null,
    }: Partial<ModelPizza & { ingredients: IngredientsDocument[] }> = {}, lang: ELanguage) {
        super();
        console.log(ingredients);
        this.id = _id;
        this.name = name[lang];
        this.price = new ModelSizes(price);
        this.weight = new ModelSizes(weight);
        this.ingredients = ingredients.map(i => new ModelPublicIngredient(i as IngredientsDocument, lang));
        this.category = category;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
