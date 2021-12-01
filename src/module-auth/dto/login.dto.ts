import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ type: String, required: true, default: 'user' })
    username: string;
    @ApiProperty({ type: String, required: true, default: 'Test123!' })
    password: string;
}
