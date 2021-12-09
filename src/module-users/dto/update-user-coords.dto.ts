import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserCoordinatesDto {
    @ApiProperty({ required: true, type: Number, default: null })
    latitude: number;
    @ApiProperty({ required: true, type: Number, default: null })
    longitude: number;
}