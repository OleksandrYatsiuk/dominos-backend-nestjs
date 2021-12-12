import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Task } from 'src/tasks/entities/task.entity';

export type TasksDocument = Task & Document & { _doc: Tasks };

@Schema({ versionKey: false })
export class Tasks {

    @Prop()
    readonly id: mongoose.Types.ObjectId;

    @Prop({ default: null, type: String, required: true })
    number: string;

    @Prop({ default: null, type: String, required: true })
    name: string;

    @Prop({ default: null, type: String, required: true })
    description: string;

    @Prop({ default: null })
    date: string;

    @Prop({ default: null })
    status: string;

    @Prop({ default: null })
    importance: string;

    @Prop({ default: new Date(), type: Date })
    createdAt: Date;

    @Prop({ default: new Date(), type: Date })
    updatedAt: Date;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);