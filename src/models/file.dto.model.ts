import { ApiProperty } from '@nestjs/swagger';


export class FileDto {
    @ApiProperty({ required: true, type: String, format: 'binary', default: null })
    image: string;
}
