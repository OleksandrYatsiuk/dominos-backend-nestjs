import { PaginatedDto, paginationUtils } from '@models/pagination.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from '@schemas/users.schema';
import { Model } from 'mongoose';
import { ModelUser } from 'src/module-users/entities/user.entity';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UsersManagementService {

  constructor(
    @InjectModel(User.name) private _userDb: Model<UsersDocument>
  ) {
  }

  updateRole(id: string, data: UpdateUserRoleDto): Promise<ModelUser> {
    return this._userDb.findByIdAndUpdate(id, { $set: { role: data.role, updatedAt: new Date() } }, { new: true })
      .then(user => new ModelUser(user));
  }

  async findAll(query: any): Promise<PaginatedDto<ModelUser[]>> {

    const filter: any = {};
    if (query?.status) {
      filter.status = query.status;
    }

    const pagination = await paginationUtils(this._userDb, { page: +query.page, limit: +query.limit }, filter, query.sort);

    return { ...pagination, result: pagination.result.map(item => new ModelUser(item)) };
  }

  findOne(id: string): Promise<ModelUser> {
    return this._userDb.findById(id).then(user => {
      if (!user) {
        throw new NotFoundException();
      }
      return new ModelUser(user);
    })
  }

  remove(id: string): Promise<ModelUser> {
    return this._userDb.findByIdAndDelete(id).then(user => {
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    })
  }
}
