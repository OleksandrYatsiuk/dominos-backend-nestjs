import { ModelLanguage } from "@models/language.model";
import { ApiProperty } from "@nestjs/swagger";
import { PromotionsDocument } from "@schemas/promotions.schema";

export class ModelPromotion implements Partial<PromotionsDocument> {
    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;
    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    name: ModelLanguage;
    @ApiProperty({ required: true, type: ModelLanguage, default: null })
    description: ModelLanguage;
    @ApiProperty({ type: String, default: null })
    image: string;
    @ApiProperty({ type: Boolean, default: false })
    isActive: boolean;
    @ApiProperty({ type: Date, default: null })
    startedAt: Date;
    @ApiProperty({ type: Date, default: null })
    endedAt: Date;
    @ApiProperty({ type: Date, default: null })
    createdAt: Date;
    @ApiProperty({ type: Date, default: null })
    updatedAt: Date;

    constructor({
        _id = null,
        name = null,
        description = null,
        image = null,
        isActive = null,
        startedAt = null,
        endedAt = null,
        updatedAt = null,
        createdAt = null
    }: Partial<PromotionsDocument> = {}) {
        this.id = _id as string;
        this.name = name;
        this.description = description;
        this.image = image;
        this.isActive = isActive;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
