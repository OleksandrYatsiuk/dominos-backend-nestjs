import { IsMultiRequired } from '@decorators/validation';
import { ModelSizes } from '@models/item-sizes.model';
import { ModelLanguage } from '@models/language.model';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { Max, Min, IsInt, IsMongoId } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreatePizzaDto {

    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    @IsMultiRequired({ each: false })
    name: ModelLanguage;

    @IsMongoId({ each: true })
    @ApiProperty({ required: true, type: Array, default: [] })
    ingredients: Array<mongoose.Types.ObjectId>;

    @ApiProperty({ type: ModelSizes, default: new ModelSizes() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    price: ModelSizes;

    @ApiProperty({ type: ModelSizes, default: new ModelSizes() })
    @Transform(({ value }) => typeof value === 'object' ? value : JSON.parse(value))
    weight: ModelSizes;


    @ApiProperty({ required: true, type: Number, default: 0 })
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(5)
    category: number;

    @ApiProperty({ required: false, type: String, format: 'binary', default: null })
    image: string;

    @ApiProperty({ type: Number, default: new Date(), readOnly: true, required: false })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date(), readOnly: true, required: false })
    updatedAt: Date;

}
