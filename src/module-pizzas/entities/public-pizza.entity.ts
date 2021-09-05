import { IItemSizes, ModelSizes } from "@models/item-sizes.model";
import { ELanguage } from "@models/language.model";
import { ApiProperty } from "@nestjs/swagger";
import * as mongoose from 'mongoose';

export class ModelPizzaPublic {

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;

    @ApiProperty({ required: true, type: String, default: 'name' })
    name: ELanguage;

    @ApiProperty({ required: true, type: Array, default: [] })
    ingredients: Array<mongoose.Types.ObjectId>;

    @ApiProperty({ type: String, default: null })
    price: IItemSizes;

    @ApiProperty({ type: String, default: null })
    weight: IItemSizes;

    @ApiProperty({ required: true, type: Number, default: 0 })
    category: number;

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
        image = null,
        createdAt = null,
        price = null,
        weight = null,
        updatedAt = null
    } = {}) {
        this.id = _id;
        this.name = name;
        this.price = new ModelSizes(price);
        this.weight = new ModelSizes(weight);
        this.ingredients = ingredients;
        this.category = category;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
