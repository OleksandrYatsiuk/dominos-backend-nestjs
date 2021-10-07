import { ApiProperty } from "@nestjs/swagger";
import { TasksDocument } from "@schemas/tasks.schema";

export class Task implements Partial<TasksDocument> {

    @ApiProperty({ required: true, readOnly: true, type: Number })
    readonly id: string;

    @ApiProperty({ required: true, type: String, default: '' })
    name: string;

    @ApiProperty({ required: true, type: String, default: '' })
    date: string;

    @ApiProperty({ required: true, type: String, default: '' })
    status: string;

    @ApiProperty({ required: true, type: String, default: '' })
    importance: string;

    @ApiProperty({ type: Number, default: new Date() })
    createdAt: Date;

    @ApiProperty({ type: Number, default: new Date() })
    updatedAt: Date;

    constructor({
        _id = null,
        name = null,
        date = null,
        status = null,
        importance = null,
        createdAt=null,
        updatedAt=null

    }) {
        this.id = _id;
        this.name = name;
        this.date = date;
        this.status = status;
        this.importance = importance;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
