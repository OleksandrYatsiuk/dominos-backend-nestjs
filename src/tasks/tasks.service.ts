import { PaginatedDto, paginationUtils } from '@models/pagination.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks, TasksDocument } from '@schemas/tasks.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { EnumStatus } from './entities/task.enum';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks.name) private _db: Model<TasksDocument>) {
  }

  async create(createTaskDto: CreateTaskDto) {
    const lastTask = await this._db.findOne({}).sort({ createdAt: -1 });
    const lastTaskNumber = lastTask ? (Number(lastTask.issue.replace(/[^0-9]/g, '')) + 1) : 1;
    createTaskDto.createdAt = new Date();
    createTaskDto.updatedAt = new Date();
    createTaskDto.issue = `D-${lastTaskNumber}`;

    const task = await new this._db({ ...createTaskDto }).save();
    return new Task(task);
  }

  async findAll(query?: Record<string, string>): Promise<PaginatedDto<Task[]>> {

    const filter: any = {};
    if (query?.status) {
      filter.status = query.status;
    }
    if (query?.importance) {
      filter.importance = query.importance;
    }

    const pagination = await paginationUtils(this._db, { page: +query.page, limit: +query.limit }, filter, query.sort);

    return { ...pagination, result: pagination.result.map(item => new Task(item)) };

  }

  findOne(id: string): Promise<Task> {
    return this._db.findById(id).then(task => new Task(task));
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this._db.exists(({ _id: id }))
      .then(exist => {
        if (exist) {
          return this._db.findByIdAndUpdate(id, {
            $set: {
              ...updateTaskDto,
              finishedAt: updateTaskDto?.status === EnumStatus.closed ? new Date() : null,
              updatedAt: new Date()
            }
          },
            { new: true }).exec().then(record => new Task(record))
        } else {
          throw new Error('Task was not founded!');
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
