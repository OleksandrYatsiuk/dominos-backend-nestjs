import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { Response, Express } from 'express';
import { ApiConsumes, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiPaginatedResponse } from '@decorators/pagination';
import { ModelDrinks } from './entities/drink.entity';
import { UploadImageDrinkDto } from './dto/upload-file.dto';
import { QuerySortDto } from '@models/query-search.dto';

@ApiTags('Drinks')
@Controller('drinks')
@ApiExtraModels(ModelDrinks)
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: ModelDrinks })
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createDrinkDto: CreateDrinkDto, @UploadedFile() file: Express.Multer.File) {
    return this.drinksService.create(createDrinkDto, file);
  }

  @Get()
  @ApiPaginatedResponse(ModelDrinks)
  @ApiQuery({ type: QuerySortDto })
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
  @ApiOkResponse({ type: ModelDrinks })
  update(@Param('id') id: string, @Body() updateDrinkDto: UpdateDrinkDto) {
    return this.drinksService.update(id, updateDrinkDto);
  }

  @Post(':id/upload')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ModelDrinks })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@Param('id') id: string, @Body() body: UploadImageDrinkDto, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    return this.drinksService.uploadImage(id, file)
      .then(result => res.status(HttpStatus.OK).send(result))
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.drinksService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }


}
