import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ type: String, required: false })
    firstName: string;
    @ApiProperty({ type: String, required: false })
    lastName: string;
    @ApiProperty({ type: Date, required: false })
    birthday: Date;
    @ApiProperty({ type: String, required: false })
    phone: string;
    @ApiProperty({ type: Date, required: false, readOnly: true })
    updatedAt: Date;
}
