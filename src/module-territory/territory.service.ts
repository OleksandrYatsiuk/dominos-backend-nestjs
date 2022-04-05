import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '@schemas/posts.schema';
import { Territories, TerritoryDocument } from '@schemas/territory.schema';
import { Model } from 'mongoose';
import { TerritoryVersionsService } from 'src/module-territory-versions/territory-versions.service';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';
import { Territory } from './entities/territory.entity';

@Injectable()
export class TerritoryService {
  constructor(
    @InjectModel(Territories.name) private _db: Model<TerritoryDocument>,
    @InjectModel(Post.name) private _postsDb: Model<PostDocument>,
    private _territoryVersionService: TerritoryVersionsService,
  ) {

  }
  async create(createTerritoryDto: CreateTerritoryDto): Promise<Territory> {
    createTerritoryDto.createdAt = new Date();
    createTerritoryDto.updatedAt = new Date();

    const territoryDocument = await new this._db({ ...createTerritoryDto }).save();

    const territoryDataVersion = await this._territoryVersionService.appendData({ ...createTerritoryDto, territory: territoryDocument._id });
    return new Territory({ ...territoryDocument._doc, details: territoryDataVersion });
  }

  async findAll(): Promise<Territory[]> {
    const territories = await this._db.find({});
    const territoriesVersions = Promise.all(territories.map((async (t) => new Territory({ ...t._doc, details: await this._territoryVersionService.getLastVersion(t._id) }))));
    return territoriesVersions;
  }

  async findOne(id: string) {
    const territory = await this._db.findById(id);
    return new Territory(territory);
  }

  async update(id: string, updateTerritoryDto: UpdateTerritoryDto): Promise<Territory> {

    updateTerritoryDto.updatedAt = new Date();
    const territory = await this._db.findByIdAndUpdate(id, { $set: { updatedAt: new Date() } }, { new: true });
    const territoryDataVersion = await this._territoryVersionService.appendData({ ...updateTerritoryDto, territory: territory._id });

    return new Territory({ ...territory, details: territoryDataVersion });
  }

  async remove(id: string) {
    const t = await this._db.findById(id);
    if (t) {
      this.unassignTerritory(id);
      this._territoryVersionService.removeAllVersions(id);
      return this._db.deleteOne({ _id: id }).exec();
    } else {
      throw new NotFoundException('Territory was not found');
    }
  }

  async unassignTerritory(territoryId: string): Promise<any> {
    return this._postsDb.updateMany({ territory: territoryId }, { $set: { territory: null } })
  }
}
