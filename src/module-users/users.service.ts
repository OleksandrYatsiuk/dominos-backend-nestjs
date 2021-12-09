import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '@schemas/auth.schema';
import { User, UsersDocument } from '@schemas/users.schema';
import { AwsS3Service } from '@services/aws.service';
import { Model, Types } from 'mongoose';
import { AuthTokens } from 'src/enums/auth-type.enum';
import { AuthService } from 'src/module-auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserCoordinatesDto } from './dto/update-user-coords.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private _userDb: Model<UsersDocument>,
    @InjectModel(Auth.name) private _authDb: Model<AuthDocument>,
    private _s3: AwsS3Service,
    private _authService: AuthService
  ) {

  }

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  current(id: Types.ObjectId): Promise<UsersDocument> {
    return this._userDb.findById(id).exec();
  }

  logout(hash: string): Promise<AuthDocument> {
    return this._authDb.findOneAndDelete({ hash }).exec();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<UsersDocument> {
    const user = await this._userDb.findById(id);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return this._userDb.findByIdAndUpdate(id, { $set: { ...updateUserDto, updatedAt: new Date() } }, { new: true });
  }

  remove(id: Types.ObjectId) {
    return `This action removes a #${id} user`;
  }

  async updateGeoLocation(id: Types.ObjectId, coords: UpdateUserCoordinatesDto): Promise<UsersDocument> {
    const user = await this._userDb.findById(id);


    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return this._userDb.findByIdAndUpdate(id, { $set: { ...coords, updatedAt: new Date() } }, { new: true });
  }

  async uploadImage(id: Types.ObjectId, file: Express.Multer.File): Promise<UsersDocument> {
    const user = await this._userDb.findById(id);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    if (user.image) {
      this._s3.removeFile(user.image);
    }

    const img = await this._s3.upload(file);
    user.image = img.Location;
    user.updatedAt = new Date();

    return this._userDb.findByIdAndUpdate(id, {
      $set: user
    }, { new: true }).exec();
  }

  async updatePassword(id: Types.ObjectId, body: UpdatePasswordDto, token: string) {
    const passwordData: AuthDocument = await this._authDb.findOne({ userId: id, type: AuthTokens.PASSWORD });

    if (await this._authService.isPasswordValid(body.newPassword, passwordData.hash)) {

      this._authDb.deleteMany({ type: AuthTokens.ACCESS, userId: id, hash: { $ne: token } }).exec();

      const hash = await this._authService.generatePasswordHash(body.newPassword);
      return this._authDb.updateOne({ _id: passwordData._id }, {
        $set: { hash, updatedAt: new Date() }
      })
    } else {
      throw new BadRequestException('Password is not valid');
    }
  }
}

