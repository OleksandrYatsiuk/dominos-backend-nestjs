import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TerritoryVersions, TerritoryVersionDocument } from '@schemas/territory-version.schema';
import { Model, Types } from 'mongoose';
import { CreateTerritoryVersionDto } from './dto/create-territory-version.dto';
import { ModelTerritoryVersion } from './entities/territory-version.entity';

@Injectable()
export class TerritoryVersionsService {

  constructor(
    @InjectModel(TerritoryVersions.name) private _db: Model<TerritoryVersionDocument>
  ) { }



  async appendData(createTerVersionDto: Partial<CreateTerritoryVersionDto>): Promise<ModelTerritoryVersion> {
    createTerVersionDto.createdAt = new Date();
    createTerVersionDto.updatedAt = new Date();

    const territoryData = await new this._db({ ...createTerVersionDto }).save();
    return new ModelTerritoryVersion(territoryData);
  }

  async getLastVersion(territoryId: string): Promise<ModelTerritoryVersion> {
    const territoryData = await this._db.findOne({ territory: Types.ObjectId(territoryId) }).sort({ updatedAt: -1 });
    return new ModelTerritoryVersion(territoryData);
  }

  removeAllVersions(territoryId: string): Promise<any> {
    return this._db.deleteMany({ territory: Types.ObjectId(territoryId) }).exec();
  }
}
