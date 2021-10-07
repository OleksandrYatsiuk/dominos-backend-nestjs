import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks, TasksDocument } from '@schemas/tasks.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks.name) private _db: Model<TasksDocument>) {

  }

  async create(createTaskDto: CreateTaskDto) {
    const task = await new this._db(createTaskDto).save();
    return  new Task(task);
  }

  findAll(): Promise<Task[]> {
    return this._db.find().then(item => item.map(s => new Task(s)));
  }

  findOne(id: string): Promise<Task> {
    return this._db.findById(id).then(task => new Task(task));
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this._db.exists(({ _id: id }))
      .then(exist => {
        if (exist) {
          return this._db.findByIdAndUpdate(id, {
            $set: { ...updateTaskDto, updatedAt: new Date() }
          },
            { new: true }).exec().then(record => new Task(record))
        } else {
          throw new Error('Pizza not found');
        }
      })
  }


  remove(id: string) {
    return this._db.findById(id).then(task => {
      if (task) {
        return this._db.deleteOne({ _id: id }).exec();
      } else {
        throw new NotFoundException('Pizza was not found');
      }
    });
  }
}
