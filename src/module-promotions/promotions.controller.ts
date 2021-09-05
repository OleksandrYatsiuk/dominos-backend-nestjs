import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpStatus } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ApiExtraModels, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ModelPromotion } from './entities/promotion.entity';
import { Response } from 'express';
import { ApiPaginatedResponse } from 'src/decorators/pagination';

@ApiTags('Promotions')
@Controller('promotions')
@ApiExtraModels(ModelPromotion)
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) { }

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionsService.create(createPromotionDto);
  }

  @Get()
  @ApiPaginatedResponse(ModelPromotion)
  @ApiQuery({ name: 'limit', example: 20, type: Number, required: false })
  @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
  findAll(@Query() query, @Res() res: Response): void {
    this.promotionsService.findAll(query)
      .then(result => res.status(HttpStatus.OK).send(result))
  }

  @Get(':id')
  @ApiOkResponse({ type: ModelPromotion })
  findOne(@Param('id') id: string, @Res() res: Response) {
    return this.promotionsService.findOne(id)
      .then(r => res.status(HttpStatus.OK).send(r))

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    return this.promotionsService.update(+id, updatePromotionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionsService.remove(+id);
  }
}
