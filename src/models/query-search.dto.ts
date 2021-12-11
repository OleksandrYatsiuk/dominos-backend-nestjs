import { ApiProperty } from '@nestjs/swagger';

export class QuerySortDto {

    @ApiProperty({ description: 'createdAt, name, -createdAt, -name...', type: String, required: false })
    sort: string;
    @ApiProperty({ name: 'limit', example: 20, type: Number, required: false })
    limit: number;
    @ApiProperty({ name: 'page', example: 1, type: Number, required: false })
    page: number;
}