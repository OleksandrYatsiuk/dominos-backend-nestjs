import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiExtraModels, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { Response } from 'express';


@Controller('tasks')
@ApiTags('Tasks')
@ApiExtraModels(Task)

export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.tasksService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }
}
