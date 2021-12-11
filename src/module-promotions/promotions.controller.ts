import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ApiConsumes, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ModelPromotion } from './entities/promotion.entity';
import { Response } from 'express';
import { ApiPaginatedResponse } from 'src/decorators/pagination';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '@models/file.dto.model';
import { QuerySortDto } from '@models/query-search.dto';


@ApiTags('Promotions')
@Controller('promotions')
@ApiExtraModels(ModelPromotion)
@ApiExtraModels(FileDto)
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiCreatedResponse({ type: ModelPromotion })
  create(@Body() createPromotionDto: CreatePromotionDto, @UploadedFile() image: Express.Multer.File) {
    return this.promotionsService.create(createPromotionDto, image).then(p => new ModelPromotion(p));
  }

  @Get()
  @ApiPaginatedResponse(ModelPromotion)
  @ApiQuery({ type: QuerySortDto })
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
  @ApiOkResponse({ type: ModelPromotion })
  update(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto): Promise<ModelPromotion> {
    return this.promotionsService.update(id, updatePromotionDto).then(p => new ModelPromotion(p));
  }

  @Post('upload/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ModelPromotion })
  @UseInterceptors(FileInterceptor('image'))
  upload(@Param('id') id: string, @Body() body: FileDto, @UploadedFile() image: Express.Multer.File) {
    return this.promotionsService.upload(id, image).then(p => new ModelPromotion(p));
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.promotionsService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }
}
