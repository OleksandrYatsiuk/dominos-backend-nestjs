import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ModelPost } from './entities/post.entity';
import { Response } from 'express';

@Controller('posts')
@ApiTags('Posts')
@ApiExtraModels(ModelPost)
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiCreatedResponse({ type: ModelPost })
  @Post(':territoryId')
  create(@Param('territoryId') territoryId: string, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(territoryId, createPostDto);
  }

  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ModelPost)
      }
    }
  })
  @Get(':territoryId')
  findAllByTerritory(@Param('territoryId') territoryId: string,) {
    return this.postsService.findAllByTerritory(territoryId);
  }

  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ModelPost)
      }
    }
  })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOkResponse({ type: ModelPost })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOkResponse({ type: ModelPost })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.postsService.remove(id).then(() => res.status(HttpStatus.NO_CONTENT).send());
  }
}
