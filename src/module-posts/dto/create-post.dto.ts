import { ApiProperty } from '@nestjs/swagger';
import { EPost } from 'src/enums/posts.enum';
import { IsMongoId } from 'class-validator';

export class CreatePostDto {

    @ApiProperty({ required: false, type: String, readOnly: true })
    id: string;

    @IsMongoId()
    @ApiProperty({ required: false, type: String, readOnly: true })
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

}
