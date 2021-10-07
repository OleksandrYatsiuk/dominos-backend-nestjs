import {
  Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpStatus,
  UseInterceptors, UploadedFile
} from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { ApiConsumes, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ModelPizza } from './entities/pizza.entity';
import { Response, Express } from 'express';
import { ApiPaginatedResponse } from 'src/decorators/pagination';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('Pizzas')
@Controller('pizzas')
@ApiExtraModels(ModelPizza)
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPizzaDto: CreatePizzaDto, @UploadedFile() image: Express.Multer.File): Promise<ModelPizza> {
    return this.pizzasService.create(createPizzaDto, image).then(p => new ModelPizza(p));
  }

  @Get()
  @ApiPaginatedResponse(ModelPizza)
  @ApiQuery({ name: 'limit', example: 20, type: Number, required: false })
  @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
  findAll(@Query() query, @Res() res: Response) {
    this.pizzasService.findAll(query)
      .then(result => res.status(HttpStatus.OK).send(result))
  }

  @Get(':id')
  @ApiOkResponse({ type: ModelPizza })
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzasService.update(id, updatePizzaDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.pizzasService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }
}




