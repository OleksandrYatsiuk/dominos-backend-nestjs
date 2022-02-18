import { Controller, Get, Res, Query, HttpStatus, Inject, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiExtraModels, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@decorators/pagination';
import { QuerySortDto } from '@models/query-search.dto';
import { DrinksService } from '../drinks.service';
import { ModelDrinkPublic } from '../entities/drink-public.entity';
import { ELanguage } from '@models/language.model';
import { LangService } from 'src/module-language/lang.service';

@ApiTags('Drinks')
@Controller('public/drinks')
@ApiExtraModels(ModelDrinkPublic)
@ApiHeader({ name: 'lang', enum: [ELanguage.uk, ELanguage.ru, ELanguage.en], required: true })
export class DrinksPublicController {
  constructor(
    private readonly drinksService: DrinksService,
    @Inject(LangService) private _langService: LangService) { }


  @Get()
  @ApiPaginatedResponse(ModelDrinkPublic)
  @ApiQuery({ type: QuerySortDto })
  findAll(@Query() query, @Res() res: Response) {
    this.drinksService.findAll(query)
      .then(response => res.status(HttpStatus.OK)
        .send({
          ...response, result: response.result.map(d =>
            new ModelDrinkPublic(d, this._langService.getLang()))
        }))
  }

  @Get(':id')
  @ApiOkResponse({ type: ModelDrinkPublic })
  async findOne(@Param('id') id: string) {
    const result = await this.drinksService.findOne(id);
    return new ModelDrinkPublic(result, this._langService.getLang());
  }

}
