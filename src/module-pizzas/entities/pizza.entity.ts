import { IItemSizes, ModelSizes } from "@models/item-sizes.model";
import { ModelLanguage } from "@models/language.model";
import { ApiProperty } from "@nestjs/swagger";
import { PizzaStatusDocument } from "@schemas/pizza-statuses.schema";
import { PizzaDocument } from "@schemas/pizzas.schema";
import * as mongoose from 'mongoose';
import { ModelPizzaStatus } from "src/pizza-statuses/entities/pizza-status.entity";

export class ModelPizza implements Partial<PizzaDocument>{

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;

    @ApiProperty({ required: true, type: ModelLanguage })
    name: ModelLanguage;

    @ApiProperty({ required: true, type: Array, default: [] })
    ingredients: Array<mongoose.Types.ObjectId>;

    @ApiProperty({ type: String, default: null })
    price: IItemSizes;

    @ApiProperty({ type: String, default: null })
    size: IItemSizes;

    @ApiProperty({ required: true, type: mongoose.Types.ObjectId, default: 0 })
    categoryId: mongoose.Types.ObjectId;

    @ApiProperty({ required: false, type: ModelPizzaStatus, default: 0 })
    category?: ModelPizzaStatus;

    @ApiProperty({ required: false, type: String, default: null })
    image: string;

    @ApiProperty({ type: Number, default: new Date() })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date() })
    updatedAt: Date;

    constructor({
        _id = null,
        name = null,
        ingredients = [],
        category = null,
        categoryId = null,
        image = null,
        createdAt = null,
        price = new ModelSizes(),
        size = new ModelSizes(),
        updatedAt = null
    }: Partial<PizzaDocument & { category?: PizzaStatusDocument }> = {}) {
        this.id = _id;
        this.name = name;
        this.price = new ModelSizes(price);
        this.size = new ModelSizes(size);
        this.ingredients = ingredients;
        this.categoryId = category?._id || categoryId;
        if (category) {
            this.category = new ModelPizzaStatus(category);
        }
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
