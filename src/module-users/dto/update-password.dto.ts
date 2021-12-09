import { Match } from "@decorators/validation/match.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDto {

    @Match('confirmPassword')
    @ApiProperty({ type: String, required: true, default: 'Test123!' })
    newPassword: string;
    @ApiProperty({ type: String, required: true, default: 'Test123!' })
    confirmPassword: string;
}