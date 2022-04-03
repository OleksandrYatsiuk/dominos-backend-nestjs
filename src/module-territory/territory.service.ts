import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '@schemas/posts.schema';
import { Territories, TerritoryDocument } from '@schemas/territory.schema';
import { Model } from 'mongoose';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import { Territory } from './entities/territory.entity';

@Injectable()
export class TerritoryService {
  constructor(
    @InjectModel(Territories.name) private _db: Model<TerritoryDocument>,
    @InjectModel(Post.name) private _postsDb: Model<PostDocument>
  ) {

  }
  async create(createTerritoryDto: CreateTerritoryDto) {
    createTerritoryDto.createdAt = new Date();
    createTerritoryDto.updatedAt = new Date();

    const territory = await new this._db({ ...createTerritoryDto }).save();

    return new Territory(territory);
  }

  async findAll() {
    const territories = await this._db.find({});
    return territories.map(t => new Territory(t));

  }

  async findOne(id: string) {
    const territory = await this._db.findById(id);
    return new Territory(territory);
  }

  async update(id: string, updateTerritoryDto: UpdateTerritoryDto) {

    updateTerritoryDto.updatedAt = new Date();
    const territory = await this._db.findByIdAndUpdate(id, { $set: updateTerritoryDto }, { new: true });

    return new Territory(territory);
  }

  async remove(id: string) {
    const t = await this._db.findById(id);
    if (t) {
      this.unassignTerritory(id)
      return this._db.deleteOne({ _id: id }).exec();
    } else {
      throw new NotFoundException('Territory was not found');
    }
  }

  async unassignTerritory(territoryId: string): Promise<any> {
    return this._postsDb.updateMany({ territory: territoryId }, { $set: { territory: null } })
  }
}
