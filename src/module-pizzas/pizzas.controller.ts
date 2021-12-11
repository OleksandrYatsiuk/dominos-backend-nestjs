import {
  Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpStatus,
  UseInterceptors, UploadedFile
} from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { ApiConsumes, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ModelPizza } from './entities/pizza.entity';
import { Response, Express } from 'express';
import { ApiPaginatedResponse } from 'src/decorators/pagination';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImagePizzaDto } from './dto/upload-image-pizza.dto';
import { QuerySortDto } from '@models/query-search.dto';


@ApiTags('Pizzas')
@Controller('pizzas')
@ApiExtraModels(ModelPizza)
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: ModelPizza })
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPizzaDto: CreatePizzaDto, @UploadedFile() image: Express.Multer.File): Promise<ModelPizza> {
    return this.pizzasService.create(createPizzaDto, image).then(p => new ModelPizza(p));
  }

  @Get()
  @ApiPaginatedResponse(ModelPizza)
  @ApiQuery({ type: QuerySortDto })
  findAll(@Query() query, @Res() res: Response) {
    this.pizzasService.findAll(query)
      .then(result => res.status(HttpStatus.OK).send(result))
  }

  @Get(':id')
  @ApiOkResponse({ type: ModelPizza })
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(id).then(result => new ModelPizza(result));
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ModelPizza })
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzasService.update(id, updatePizzaDto);
  }

  @Post(':id/upload')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ModelPizza })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@Param('id') id: string, @Body() body: UploadImagePizzaDto, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    return this.pizzasService.uploadImage(id, file)
      .then(result => res.status(HttpStatus.OK).send(result))
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.pizzasService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }
}




