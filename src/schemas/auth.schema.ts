import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AuthTokens } from 'src/enums/auth-type.enum';
import { UsersDocument } from './users.schema';


export type AuthDocument = Auth & mongoose.Document & { _doc: Auth };

@Schema({ versionKey: false })
export class Auth {

    @Prop()
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, required: true, type: String, ref: 'User' })
    userId: mongoose.Types.ObjectId | UsersDocument;

    @Prop({ required: true, type: String })
    hash: string;

    @Prop({ enum: [AuthTokens.PASSWORD, AuthTokens.ACCESS], type: Number })
    type: AuthTokens;

    @Prop({ default: Date })
    createdAt: Date;

    @Prop({ default: Date })
    updatedAt: Date;

    @Prop({ default: Date })
    expiredAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);