import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginResponse {
    @ApiProperty({ type: String })
    token: string;
    @ApiProperty({ type: Date })
    expiredAt: Date;
}
