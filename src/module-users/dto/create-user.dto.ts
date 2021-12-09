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
}
