import { DrinksDocument } from '@schemas/drinks.schema';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ModelSizes } from '@models/item-sizes.model';
import { ModelDrinks } from './drink.entity';
import { ELanguage } from '@models/language.model';

export class ModelDrinkPublic extends OmitType(ModelDrinks, ['name']) {

    @ApiProperty({ required: true, type: String, default: 'string' })
    name: string;

    constructor({
        _id = null,
        name = null,
        image = null,
        category = null,
        price = new ModelSizes(),
        size = new ModelSizes(),
        updatedAt = null,
        createdAt = null
    }: Partial<DrinksDocument> = {}, lang: ELanguage) {
        super();
        this.id = _id;
        this.name = name[lang];
        this.category = category;
        this.price = new ModelSizes(price);
        this.size = new ModelSizes(size);
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}

