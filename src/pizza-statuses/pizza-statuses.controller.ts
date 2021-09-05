import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PizzaStatusesService } from './pizza-statuses.service';
import { CreatePizzaStatusDto } from './dto/create-pizza-status.dto';
import { UpdatePizzaStatusDto } from './dto/update-pizza-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pizza Statuses')
@Controller('pizza-statuses')
export class PizzaStatusesController {
  constructor(private readonly pizzaStatusesService: PizzaStatusesService) { }

  @Post()
  create(@Body() createPizzaStatusDto: CreatePizzaStatusDto) {
    return this.pizzaStatusesService.create(createPizzaStatusDto);
  }

  @Get()
  findAll() {
    return this.pizzaStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pizzaStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePizzaStatusDto: UpdatePizzaStatusDto) {
    return this.pizzaStatusesService.update(+id, updatePizzaStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pizzaStatusesService.remove(+id);
  }
}
