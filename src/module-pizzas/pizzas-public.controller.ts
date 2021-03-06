import { Controller, Get, Res, Query, HttpStatus, Param } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { ApiExtraModels, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiPaginatedResponse } from 'src/decorators/pagination';
import { ELanguage } from '@models/language.model';
import { ModelPizzaPublic } from './entities/public-pizza.entity';
import { QuerySortDto } from '@models/query-search.dto';


@ApiTags('Pizzas')
@Controller('public/pizzas')
@ApiExtraModels(ModelPizzaPublic)
@ApiHeader({ name: 'lang', enum: [ELanguage.uk, ELanguage.ru, ELanguage.en], required: true })
export class PizzasPublicController {
  constructor(private readonly pizzasService: PizzasService) { }

  @Get()
  @ApiPaginatedResponse(ModelPizzaPublic)
  @ApiQuery({ type: QuerySortDto })
  findAllPublic(@Query() query, @Res() res: Response) {
    this.pizzasService.findAllPublic(query)
      .then(result => res.status(HttpStatus.OK).send(result))
  }

  @Get(':id')
  @ApiOkResponse({ type: ModelPizzaPublic })
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOnePublic(id)
  }
}




