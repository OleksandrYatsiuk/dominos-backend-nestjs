import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserRole } from 'src/enums/roles.enum';


export type UsersDocument = User & mongoose.Document & { _doc: User };

@Schema({ versionKey: false })
export class User {

    @Prop()
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, required: false, type: String })
    firstName: string;

    @Prop({ default: null, required: false, type: String })
    lastName: string;

    @Prop({ required: true, type: String })
    username: string;

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ required: true, type: UserRole, enum: [UserRole.ADMIN, UserRole.BUYER], default: UserRole.BUYER })
    role: UserRole;

    @Prop({ default: null })
    image: string;

    @Prop({ default: null, type: Date, required: false })
    birthday: Date | null;

    @Prop({ default: null, type: String, required: false })
    phone: string | null;

    @Prop({ default: Date })
    createdAt: Date;

    @Prop({ default: Date })
    updatedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(User);