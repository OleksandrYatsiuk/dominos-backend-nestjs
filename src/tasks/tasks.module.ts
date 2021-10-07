import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Tasks, TasksSchema } from '@schemas/tasks.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [TasksController],
  imports: [MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }])],
  providers: [TasksService]
})
export class TasksModule { }
