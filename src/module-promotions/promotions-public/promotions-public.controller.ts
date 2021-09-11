import { ApiPaginatedResponse } from '@decorators/pagination';
import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ApiExtraModels, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ModelPublicPromotion } from '../entities/promotion-public.entity ';
import { PromotionsService } from '../promotions.service';
import { Response } from 'express';
import { ELanguage } from '@models/language.model';

@ApiTags('Promotions')
@Controller('public/promotions')
@ApiExtraModels(ModelPublicPromotion)
export class PromotionsPublicController {

    constructor(private readonly promotionsService: PromotionsService) { }

    @Get()
    @ApiPaginatedResponse(ModelPublicPromotion)
    @ApiQuery({ name: 'limit', example: 20, type: Number, required: false })
    @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
    @ApiHeader({
        name: 'lang',
        enum: [ELanguage.uk, ELanguage.ru, ELanguage.en],
        required: true
    })
    findAll(@Query() query, @Res() res: Response): void {
        this.promotionsService.findAllPublic(query)
            .then(result => res.status(HttpStatus.OK).send(result))
    }

    @Get(':id')
    @ApiOkResponse({ type: ModelPublicPromotion })
    @ApiHeader({
        name: 'lang',
        enum: [ELanguage.uk, ELanguage.ru, ELanguage.en],
        required: true
    })
    findOne(@Param('id') id: string, @Res() res: Response): void {
        this.promotionsService.findOnePublic(id)
            .then(result => res.status(HttpStatus.OK).send(result))
    }
}
