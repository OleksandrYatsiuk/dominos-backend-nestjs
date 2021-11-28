import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { QueryFindProductsDto } from './dto/find-products.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  @Post()
  findAll(@Body() query: QueryFindProductsDto, @Res() res: Response): Promise<any> {
    return this.productsService.findProductsByIds(query)
      .then(result => res.status(HttpStatus.OK).send(result))
  }
}
