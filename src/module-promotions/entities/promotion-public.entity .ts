import { ApiProperty } from "@nestjs/swagger";

export class ModelPublicPromotion {
    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;
    @ApiProperty({ required: true, type: String, default: null })
    name: string;
    @ApiProperty({ required: true, type: String, default: null })
    description: string;
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
    }) {
        this.id = _id;
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
