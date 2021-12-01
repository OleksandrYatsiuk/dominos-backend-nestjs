import { Match } from "@decorators/validation/match.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({ type: String, required: false })
    firstName: string;
    @ApiProperty({ type: String, required: false })
    lastName: string;
    @ApiProperty({ type: String, required: true, default: 'user' })
    username: string;
    @ApiProperty({ type: String, required: true, default: 'test@test.com' })
    email: string;

    @Match('confirmPassword')
    @ApiProperty({ type: String, required: true, default: 'Test123!' })
    password: string;

    @ApiProperty({ type: String, required: true, default: 'Test123!' })
    confirmPassword: string;
}
