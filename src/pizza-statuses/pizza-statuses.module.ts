import { Module } from '@nestjs/common';
import { PizzaStatusesService } from './pizza-statuses.service';
import { PizzaStatusesController } from './pizza-statuses.controller';
import { PizzaStatusesSchema, PizzaStatuses } from '@schemas/pizza-statuses.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LanguageModule } from 'src/module-language/language.module';

@Module({
  controllers: [PizzaStatusesController],
  imports: [MongooseModule.forFeature([{ name: PizzaStatuses.name, schema: PizzaStatusesSchema }]), LanguageModule],
  providers: [PizzaStatusesService]
})
export class PizzaStatusesModule { }
