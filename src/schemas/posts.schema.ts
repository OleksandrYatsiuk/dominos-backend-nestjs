import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { EPost } from 'src/enums/posts.enum';
import { ModelPost } from 'src/module-posts/entities/post.entity';

export type PostDocument = ModelPost & Document & { _doc: Post };

@Schema({ versionKey: false })
export class Post {

    @Prop()
    readonly id: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, required: false, ref: 'Territories' })
    territory: mongoose.Types.ObjectId;

    @Prop({ default: EPost.Telegram, type: EPost, enum: [EPost.Facebook, EPost.Telegram, EPost.Twitter], required: true })
    type: EPost;

    @Prop({ default: '' })
    link: string;

    @Prop({ default: '', type: String, required: false })
    description: string;


    @Prop({ default: '' })
    title: string;

    @Prop({ default: '' })
    resource: string;

    @Prop({ default: new Date(), type: Date })
    createdAt: Date;

    @Prop({ default: new Date(), type: Date })
    updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);