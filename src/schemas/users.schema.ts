import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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

    @Prop({ required: true, type: String, enum: [UserRole.Administrator, UserRole.Buyer], default: UserRole.Buyer })
    role: UserRole;

    @Prop({ default: null })
    image: string;

    @Prop({ default: null, type: Date, required: false })
    birthday: Date | null;

    @Prop({ default: null, type: String, required: false })
    phone: string | null;

    @Prop({ default: null, type: Number, required: false })
    latitude: number;

    @Prop({ default: null, type: Number, required: false })
    longitude: number;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ default: Date })
    updatedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(User);