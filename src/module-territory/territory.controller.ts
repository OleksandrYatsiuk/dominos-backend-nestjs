import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { TerritoryService } from './territory.service';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import { ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Territory } from './entities/territory.entity';
import { Response } from 'express';
import { TerritoryVersionsService } from 'src/module-territory-versions/territory-versions.service';


@Controller('territory')
@ApiTags('Territory')
@ApiExtraModels(Territory)


export class TerritoryController {
  constructor(
    private readonly territoryService: TerritoryService,
    private readonly territoryVersionService: TerritoryVersionsService
  ) { }

  @ApiCreatedResponse({ type: Territory })
  @Post()
  create(@Body() createTerritoryDto: CreateTerritoryDto) {
    return this.territoryService.create(createTerritoryDto);
  }

  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(Territory)
      }
    }
  })
  @Get()
  findAll() {
    return this.territoryService.findAll();
  }

  @ApiOkResponse({ type: Territory })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.territoryService.findOne(id);
  }

  @ApiOkResponse({ type: Territory })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTerritoryDto: UpdateTerritoryDto) {
    return this.territoryService.update(id, updateTerritoryDto);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.territoryService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }
}
