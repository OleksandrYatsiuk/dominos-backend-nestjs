import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { Response, Express } from 'express';
import { ApiConsumes, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiPaginatedResponse } from '@decorators/pagination';
import { ModelDrinks } from './entities/drink.entity';

@ApiTags('Drinks')
@Controller('drinks')
@ApiExtraModels(ModelDrinks)
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createDrinkDto: CreateDrinkDto, @UploadedFile() file: Express.Multer.File) {
    return this.drinksService.create(createDrinkDto, file);
  }

  @Get()
  @ApiPaginatedResponse(ModelDrinks)
  @ApiQuery({ name: 'limit', example: 20, type: Number, required: false })
  @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
  findAll(@Query() query, @Res() res: Response) {
    this.drinksService.findAll(query)
      .then(result => res.status(HttpStatus.OK).send(result))
  }


  @Get(':id')
  @ApiOkResponse({ type: ModelDrinks })
  findOne(@Param('id') id: string) {
    return this.drinksService.findOne(id).then(result => new ModelDrinks(result));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrinkDto: UpdateDrinkDto) {
    return this.drinksService.update(id, updateDrinkDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.drinksService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }
}
