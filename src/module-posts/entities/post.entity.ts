import { ApiProperty } from "@nestjs/swagger";
import { PostDocument } from "@schemas/posts.schema";
import { EPost } from "src/enums/posts.enum";

export class ModelPost implements Partial<PostDocument> {

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;

    @ApiProperty({ required: false, type: String })
    territory: string;

    @ApiProperty({
        required: false,
        type: EPost,
        default: EPost.Telegram,
        enum: [EPost.Facebook, EPost.Telegram, EPost.Twitter]
    })
    type: EPost;

    @ApiProperty({ required: false, type: String, default: '' })
    link: string;

    @ApiProperty({ required: false, type: String, default: '' })
    title: string;

    @ApiProperty({ required: false, type: String, default: '' })
    description: string;

    @ApiProperty({ required: false, type: String, default: '' })
    resource: string;

    @ApiProperty({ type: Number, default: new Date(), readOnly: true })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date(), readOnly: true })
    updatedAt: Date;

    constructor({
        _id = null,
        territory = null,
        link = '',
        type = EPost.Telegram,
        title = '',
        description = '',
        resource = '',
        updatedAt = null,
        createdAt = null
    }) {
        this.id = _id;
        this.territory = territory;
        this.link = link;
        this.type = type;
        this.title = title;
        this.description = description;
        this.resource = resource;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
