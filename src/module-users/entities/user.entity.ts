import { ApiProperty } from '@nestjs/swagger';
import { UsersDocument } from '@schemas/users.schema';
import { UserRole } from 'src/enums/roles.enum';
import * as mongoose from 'mongoose';

export class ModelUser {

    @ApiProperty({ type: String, required: false, readOnly: true, default: '61a7af96d95eae0d397d0bef' })
    readonly id: mongoose.Types.ObjectId;
    @ApiProperty({ type: String, required: false })
    firstName: string;
    @ApiProperty({ type: String, required: false })
    lastName: string;
    @ApiProperty({ type: String, required: true })
    username: string;
    @ApiProperty({ type: String, required: true })
    email: string;
    @ApiProperty({ type: String, required: true, enum: UserRole, default: UserRole.Buyer })
    role: UserRole;
    @ApiProperty({ type: Date, required: false })
    birthday: Date;
    @ApiProperty({ type: String, required: false })
    phone: string;
    @ApiProperty({ type: String, required: false })
    image: string;

    @ApiProperty({ required: true, type: Number, default: null })
    latitude: number;
    @ApiProperty({ required: true, type: Number, default: null })
    longitude: number;
    @ApiProperty({ type: Date, required: false, readOnly: true })
    readonly createdAt: Date;
    @ApiProperty({ type: Date, required: false, readOnly: true })
    readonly updatedAt: Date;


    constructor({
        _id = null,
        firstName = null,
        lastName = null,
        username = null,
        email = null,
        role = UserRole.Buyer,
        birthday = null,
        phone = null,
        image = null,
        latitude = null,
        longitude = null,
        createdAt = new Date(),
        updatedAt = new Date(),
    }: Partial<UsersDocument>) {
        this.id = _id as any;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.role = role;
        this.birthday = birthday;
        this.phone = phone;
        this.image = image;
        this.latitude = latitude;
        this.longitude = longitude;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }
}
