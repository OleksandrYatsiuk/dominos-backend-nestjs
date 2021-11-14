import { ApiProperty } from "@nestjs/swagger";

export class UploadImageDrinkDto {

    @ApiProperty({ required: false, type: String, format: 'binary', default: null })
    file: Express.Multer.File;
}