import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiExtraModels, ApiNoContentResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { Response } from 'express';
import { EnumImportance, EnumStatus } from './entities/task.enum';
import { ApiPaginatedResponse } from '@decorators/pagination';


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
  @ApiPaginatedResponse(Task)
  @ApiQuery({ name: 'sort', description: 'date, name, -date, -name...', type: String, required: false })
  @ApiQuery({
    name: 'status', description: EnumStatus.pending,
    enum: [EnumStatus.pending, EnumStatus.inProgress, EnumStatus.closed],
    required: false
  })
  @ApiQuery({
    name: 'importance',
    description: EnumImportance.normal,
    enum: [EnumImportance.critical, EnumImportance.minor, EnumImportance.normal],
    required: false
  })
  @ApiQuery({ name: 'limit', example: 20, type: Number, required: false })
  @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
  findAll(@Query() query: any) {
    return this.tasksService.findAll(query);
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
