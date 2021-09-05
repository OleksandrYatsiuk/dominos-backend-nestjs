import { ApiProperty } from "@nestjs/swagger";

export class CreatePromotionDto {
    @ApiProperty({
        required: false,
        readOnly: true,
        type: String,
    })
    readonly id: string;

    @ApiProperty({
        required: true,
        type: String,
        default: 'name'

    })
    name: string;
    @ApiProperty({
        required: false,
        type: String,
        default: 'description'
    })
    description: string;

    @ApiProperty({
        required: false,
        type: Number,

        default: 0
    })
    status: number;

    @ApiProperty({
        required: false,
        type: Number
    })
    price: number;

    @ApiProperty({
        type: Number,
        required: false,
        readOnly: true,
        default: Date.now()
    })
    readonly createdAt: number;
    @ApiProperty({
        type: Number,
        required: false,
        readOnly: true,
        default: Date.now()
    })
    readonly updatedAt: number;
}
