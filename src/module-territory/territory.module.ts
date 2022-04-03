import { Module } from '@nestjs/common';
import { TerritoryService } from './territory.service';
import { TerritoryController } from './territory.controller';
import { Territories, territorySchema } from '@schemas/territory.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '@schemas/posts.schema';

@Module({
  controllers: [TerritoryController],
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Territories.name, schema: territorySchema }
    ])
  ],
  providers: [TerritoryService]
})
export class TerritoryModule { }
