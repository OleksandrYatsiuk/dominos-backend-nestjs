import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ type: String, required: false })
    firstName: string;
    @ApiProperty({ type: String, required: false })
    lastName: string;
    @ApiProperty({ type: String, required: true })
    username: string;
    @ApiProperty({ type: String, required: true })
    email: string;
    @ApiProperty({ type: String, required: true })
    password: string;
    @ApiProperty({ type: String, required: true })
    confirmPassword: string;
    // @ApiProperty({ type: String, required: true })
    // passwordHash: string;
    // @ApiProperty({ type: String, required: true, enum: [UserRole.BUYER, UserRole.ADMIN], default: UserRole.BUYER })
    // role: UserRole;
    // @ApiProperty({ type: String, required: false })
    // birthday: string;
    // @ApiProperty({ type: String, required: false })
    // phone: string;
    // @ApiProperty({ type: 'binary', required: false })
    // image: Express.Multer.File;
    // @ApiProperty({ type: Date, required: false, readOnly: true })
    // readonly createdAt: Date;
    // @ApiProperty({ type: Date, required: false, readOnly: true })
    // readonly updatedAt: Date;


}
