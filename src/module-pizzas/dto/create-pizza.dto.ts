import { IsMultiRequired } from '@decorators/validation';
import { ModelSizes } from '@models/item-sizes.model';
import { ModelLanguage } from '@models/language.model';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreatePizzaDto {

    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    @IsMultiRequired({ each: false })
    name: ModelLanguage;

    @ApiProperty({ required: true, type: Array, default: [] })
    @Transform(({ value }: { value: string }) => Array.isArray(value) ? value : value.split(',').filter(id => id)
    )
    @IsMongoId({ each: true })
    ingredients: Array<mongoose.Types.ObjectId>;

    @ApiProperty({ type: ModelSizes, default: new ModelSizes() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    price: ModelSizes;

    @ApiProperty({ type: ModelSizes, default: new ModelSizes() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    size: ModelSizes;


    @ApiProperty({ required: true, type: mongoose.Types.ObjectId, default: 0 })
    categoryId: mongoose.Types.ObjectId;

    @ApiProperty({ required: false, type: String, format: 'binary', default: null })
    image: string;

    @ApiProperty({ type: Number, default: new Date(), readOnly: true, required: false })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date(), readOnly: true, required: false })
    updatedAt: Date;

}
