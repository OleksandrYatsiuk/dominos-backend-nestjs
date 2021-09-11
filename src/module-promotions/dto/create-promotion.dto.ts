import { IsMultiRequired } from "@decorators/validation";
import { ModelLanguage } from "@models/language.model";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from 'class-transformer';


export class CreatePromotionDto {
    @ApiProperty({
        required: false,
        readOnly: true,
        type: String,
    })
    readonly id: string;

    @Transform(({ value }) =>  JSON.parse(value))
    @IsMultiRequired({ each: false })
    @ApiProperty({
        required: true,
        type: ModelLanguage,
        default: new ModelLanguage()
    })

    name: ModelLanguage;

    @Transform(({ value }) =>  JSON.parse(value))
    @IsMultiRequired({ each: false })
    @ApiProperty({
        required: false,
        type: ModelLanguage,
        default: new ModelLanguage()
    })
    description: ModelLanguage;

    @ApiProperty({
        required: false,
        type: Boolean,
        default: false
    })
    isActive: boolean;

    @ApiProperty({ type: Date, default: null, required: false })
    startedAt: Date;

    @ApiProperty({ type: Date, default: null, required: false })
    endedAt: Date;

    @ApiProperty({ required: false, type: String, format: 'binary', default: null })
    image: string;

    @ApiProperty({
        type: Number,
        required: false,
        readOnly: true,
        default: Date.now()
    })
    readonly createdAt: Date;
    @ApiProperty({
        type: Number,
        required: false,
        readOnly: true,
        default: Date.now()
    })
    readonly updatedAt: Date;
}
