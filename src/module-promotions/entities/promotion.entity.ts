import { ApiProperty } from "@nestjs/swagger";
import { PromotionsDocument } from "@schemas/promotions.schema";

export class ModelPromotion implements Partial<PromotionsDocument> {
    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;
    @ApiProperty({ required: true, type: String, default: 'name' })
    title: string;
    @ApiProperty({ required: true, type: String, default: null })
    description: string;
    @ApiProperty({ type: String, default: null })
    image: string;
    @ApiProperty({ type: Number, default: 0 })
    status: number;
    @ApiProperty({ type: Date, default: null })
    startedAt: Date;
    @ApiProperty({ type: Date, default: null })
    endedAt: Date;
    @ApiProperty({ type: Number, default: null })
    createdAt: number;
    @ApiProperty({ type: Number, default: null })
    updatedAt: number;

    constructor({
        _id = null,
        title = null,
        description = null,
        image = null,
        status = null,
        startedAt = null,
        endedAt = null,
        updatedAt = null,
        createdAt = null
    }: Partial<PromotionsDocument> = {}) {
        this.id = _id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.status = status;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
