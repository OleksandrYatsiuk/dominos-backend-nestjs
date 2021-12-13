import { ApiProperty } from "@nestjs/swagger";
import { EnumImportance, EnumStatus } from "../entities/task.enum";

export class CreateTaskDto {
    @ApiProperty({ required: true, type: String, default: '' })
    name: string;

    @ApiProperty({ required: false, type: String, default: 'D-1', readOnly: true })
    issue: string;

    @ApiProperty({ required: false, type: String, default: '' })
    description: string;

    @ApiProperty({ required: true, type: String, default: '' })
    date: string;

    @ApiProperty({ required: true, type: String, enum: [EnumStatus.inProgress, EnumStatus.pending, EnumStatus.closed], default: EnumStatus.pending })
    status: EnumStatus;

    @ApiProperty({ required: true, type: String, enum: [EnumImportance.critical, EnumImportance.minor, EnumImportance.normal], default: EnumImportance.normal })
    importance: EnumImportance;

    @ApiProperty({ required: true, type: Date, default: null, readOnly: true })
    finishedAt: Date;

    @ApiProperty({ required: true, type: Date, default: new Date(), readOnly: true })
    createdAt: Date;
    @ApiProperty({ required: true, type: Date, default: new Date(), readOnly: true })
    updatedAt: Date;
}
