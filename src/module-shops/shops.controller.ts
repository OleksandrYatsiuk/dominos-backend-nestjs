import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ApiConsumes, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModelShop } from './entities/shop.entity';
import { Response } from 'express';

@ApiTags('Shops')
@ApiExtraModels(ModelShop)
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createShopDto: CreateShopDto, @UploadedFile() image: Express.Multer.File): Promise<ModelShop> {
    return this.shopsService.create(createShopDto, image).then(shop => new ModelShop(shop));
  }

  @Get()
  @ApiOkResponse({ schema: { type: 'array', items: { $ref: getSchemaPath(ModelShop) } } })
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ModelShop })
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ModelShop })
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.shopsService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }
}
