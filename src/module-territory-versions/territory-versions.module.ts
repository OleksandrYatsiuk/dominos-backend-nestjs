import { Module } from '@nestjs/common';
import { TerritoryVersionsService } from './territory-versions.service';
import { TerritoryVersions, territoryVersionSchema } from '@schemas/territory-version.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TerritoryVersions.name, schema: territoryVersionSchema }
    ])
  ],
  providers: [TerritoryVersionsService],
  exports: [TerritoryVersionsService]
})
export class TerritoryVersionsModule { }
