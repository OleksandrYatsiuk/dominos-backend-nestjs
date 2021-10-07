import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty({ required: true, type: String, default: '' })
    name: string;

    @ApiProperty({ required: true, type: String, default: '' })
    date: string;

    @ApiProperty({ required: true, type: String, default: '' })
    status: string;

    @ApiProperty({ required: true, type: String, default: '' })
    importance: string;
}
