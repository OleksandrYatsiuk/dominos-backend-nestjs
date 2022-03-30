import { Module } from '@nestjs/common';
import { TerritoryService } from './territory.service';
import { TerritoryController } from './territory.controller';
import { Territories, territorySchema } from '@schemas/territory.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [TerritoryController],
  imports: [
    MongooseModule.forFeature([{ name: Territories.name, schema: territorySchema }])
  ],
  providers: [TerritoryService]
})
export class TerritoryModule { }
