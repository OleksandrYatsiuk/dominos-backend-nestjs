import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PizzaStatusDocument, PizzaStatuses } from '@schemas/pizza-statuses.schema';
import { Model } from 'mongoose';
import { CreatePizzaStatusDto } from './dto/create-pizza-status.dto';
import { UpdatePizzaStatusDto } from './dto/update-pizza-status.dto';
import { ModelPizzaStatus } from './entities/pizza-status.entity';

@Injectable()
export class PizzaStatusesService {
  constructor(@InjectModel(PizzaStatuses.name) private _db: Model<PizzaStatusDocument>,) {
  }

  async create(createPizzaStatusDto: CreatePizzaStatusDto) {
    const status = new this._db(createPizzaStatusDto).save();
    return status;
  }

  findAll(): Promise<ModelPizzaStatus[]> {
    return this._db.find().then(item => item.map(s => new ModelPizzaStatus(s)));
  }

  findOne(id: number) {
    return `This action returns a #${id} pizzaStatus`;
  }

  update(id: number, updatePizzaStatusDto: UpdatePizzaStatusDto) {
    return `This action updates a #${id} pizzaStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} pizzaStatus`;
  }
}
