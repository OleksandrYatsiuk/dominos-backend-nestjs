import { Controller, Get, Query, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { QueryFindProductsDto } from './dto/find-products.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  @Get()
  findAll(@Query() query: QueryFindProductsDto) {
    return this.productsService.findProductsByIds(query);
  }
}
