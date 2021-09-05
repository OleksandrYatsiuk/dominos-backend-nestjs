import { ModelCoords } from '@models/coords.model';
import { ModelLanguage } from '@models/language.model';
import { ApiProperty } from '@nestjs/swagger';
import { ShopsDocument } from '@schemas/shops.schema';


export class ModelShop implements Partial<ShopsDocument>{

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string

    @ApiProperty({ required: true, type: ModelCoords, default: new ModelCoords() })
    coords: ModelCoords;

    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    address: ModelLanguage;

    @ApiProperty({ required: false, type: String, default: null })
    image: string;

    @ApiProperty({ type: Number, default: new Date() })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date() })
    updatedAt: Date;

    constructor({
        _id = null,
        coords = new ModelCoords(),
        address = null,
        image = null,
        createdAt = null,
        updatedAt = null
    }: Partial<ShopsDocument> = {}) {
        this.id = _id;
        this.coords = new ModelCoords(coords);
        this.address = new ModelLanguage(address);
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
