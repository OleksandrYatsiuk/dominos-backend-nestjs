import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '@schemas/posts.schema';
import { Territories, territorySchema } from '@schemas/territory.schema';

@Module({
  controllers: [PostsController],
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Territories.name, schema: territorySchema }])
  ],
  providers: [PostsService]
})
export class PostsModule { }
