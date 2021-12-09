import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileImageDto {
    @ApiProperty({ required: false, type: String, format: 'binary', default: null })
    file: Express.Multer.File;
}