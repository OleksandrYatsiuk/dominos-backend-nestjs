import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseInterceptors, UploadedFile, HttpStatus, UseGuards } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { Response, Express } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiPaginatedResponse } from '@decorators/pagination';
import { ModelDrinks } from './entities/drink.entity';
import { UploadImageDrinkDto } from './dto/upload-file.dto';
import { QuerySortDto } from '@models/query-search.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserRole } from 'src/enums/roles.enum';
import { Roles } from 'src/guards/roles/roles.decorator';

@ApiTags('Drinks')
@Controller('drinks')
@ApiExtraModels(ModelDrinks)
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
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
      .then(response => res.status(HttpStatus.OK).send({ ...response, result: response.result.map(d => new ModelDrinks(d)) }))
  }


  @Get(':id')
  @ApiOkResponse({ type: ModelDrinks })
  findOne(@Param('id') id: string) {
    return this.drinksService.findOne(id).then(result => new ModelDrinks(result));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: ModelDrinks })
  update(@Param('id') id: string, @Body() updateDrinkDto: UpdateDrinkDto) {
    return this.drinksService.update(id, updateDrinkDto);
  }

  @Post(':id/upload')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ModelDrinks })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@Param('id') id: string, @Body() body: UploadImageDrinkDto, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    return this.drinksService.uploadImage(id, file)
      .then(result => res.status(HttpStatus.OK).send(result))
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)
  @ApiNoContentResponse()
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.drinksService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }


}
