import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '@schemas/posts.schema';
import { Territories, TerritoryDocument } from '@schemas/territory.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ModelPost } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post.name) private _db: Model<PostDocument>,
    @InjectModel(Territories.name) private _territoryDb: Model<TerritoryDocument>
  ) {

  }
  async create(territoryId: string, createPostDto: CreatePostDto): Promise<ModelPost | NotFoundException> {
    createPostDto.createdAt = new Date();
    createPostDto.updatedAt = new Date();
    createPostDto.territory = territoryId;

    const isTerritoryExist = await this._territoryDb.exists({ _id: territoryId });

    if (isTerritoryExist) {
      const post = await new this._db({ ...createPostDto }).save();
      return new ModelPost(post);
    }
    return new NotFoundException('Territory was not Found');

  }

  async findAll(territoryId: string): Promise<ModelPost[]> {
    const posts = await this._db.find({ territory: territoryId });
    return posts.map(p => new ModelPost(p._doc));
  }

  async findOne(id: string): Promise<ModelPost> {
    const post = await this._db.findById(id);
    return new ModelPost(post);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<ModelPost> {
    updatePostDto.updatedAt = new Date();
    const post = await this._db.findByIdAndUpdate(id, { $set: updatePostDto }, { new: true });
    return new ModelPost(post);
  }

  async remove(id: string) {
    const t = await this._db.findById(id);
    if (t) {
      return this._db.deleteOne({ _id: id }).exec();
    } else {
      throw new NotFoundException('Post was not found');
    }
  }

}
