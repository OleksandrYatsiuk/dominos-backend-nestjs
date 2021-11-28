import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { QueryFindProductsDto } from './dto/find-products.dto';
import { ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Response } from 'express';
import { ModelPizza } from 'src/module-pizzas/entities/pizza.entity';
import { ModelDrinks } from 'src/module-drinks/entities/drink.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  @Post()
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            pizzas: {
              type: 'array',
              items: { $ref: getSchemaPath(ModelPizza) }
            },
            drinks: {
              type: 'array',
              items: { $ref: getSchemaPath(ModelDrinks) }
            }
          }
        },
      ]
    }
  })
  findAll(@Body() query: QueryFindProductsDto, @Res() res: Response): Promise<any> {
    return this.productsService.findProductsByIds(query)
      .then(result => res.status(HttpStatus.OK).send(result))
  }
}
