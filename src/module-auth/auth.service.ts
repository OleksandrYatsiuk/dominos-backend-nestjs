import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UsersDocument } from '@schemas/users.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '@schemas/auth.schema';
import { RegisterDto } from './dto/register.dto';
import { AuthTokens } from 'src/enums/auth-type.enum';
import { LoginDto } from './dto/login.dto';
import { ModelUser } from '../module-users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private _userDb: mongoose.Model<UsersDocument>,
    @InjectModel(Auth.name) private _authDb: mongoose.Model<AuthDocument>
  ) {

  }

  async register(data: RegisterDto): Promise<UsersDocument> {

    const isExistUsername = await this._userDb.exists({ username: data.username });
    const isExistEmail = await this._userDb.exists({ email: data.email });
    if (isExistEmail) {
      throw new Error("Email already used!");
    }

    if (isExistUsername) {
      throw new Error("Username already used!");
    }

    const user = await this._createUser(data);
    await this._createPasswordToken(data.password, user._id);
    return user;
  }

  async login(data: LoginDto) {

    const user = await this._getUserData(data.username);
    const hashData = await this._authDb.findOne({ userId: user._id });
    if (hashData) {
      if (await this.isPasswordValid(data.password, hashData.hash)) {

        const date = new Date();
        const expiredDate = date.setDate(date.getDate() + 1);

        const accessTokenData = await new this._authDb({
          hash: await this.generatePasswordHash('Access Token'),
          userId: await user._id,
          createdAt: date,
          updatedAt: date,
          type: AuthTokens.ACCESS,
          expiredAt: new Date(expiredDate)
        }).save();

        return {
          token: accessTokenData.hash,
          expiredAt: accessTokenData.expiredAt
        };
      }
    }
    throw new BadRequestException('Credentials is invalid.');
  }


  async validateUser(token: string): Promise<ModelUser | false> {
    return this._authDb.findOne({ hash: token, type: AuthTokens.ACCESS }).populate('userId')
      .then(authData => {

        if (!authData) {
          return false;
        }
        const user = new ModelUser(authData.userId as UsersDocument);
        const tokenData: Auth & { user: ModelUser } = { ...authData._doc, userId: user.id, user };
        if (!tokenData) {
          return false;
        }
        const currentDate = new Date();
        if (tokenData.expiredAt.getTime() > currentDate.getTime()) {
          return tokenData.user;
        } else {
          this._authDb.deleteOne({ _id: tokenData.userId }).exec();
        }
        return false;
      })
  }

  private async _createPasswordToken(password: string, userId: mongoose.Types.ObjectId): Promise<AuthDocument> {

    const date = new Date();
    const authData: Partial<AuthDocument> = {
      hash: await this.generatePasswordHash(password),
      userId,
      createdAt: date,
      updatedAt: date,
      type: AuthTokens.PASSWORD,
      expiredAt: null
    }

    return await new this._authDb(authData).save();

  }

  generatePasswordHash(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  isPasswordValid(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async _createUser(data: RegisterDto): Promise<UsersDocument> {
    const userData: Partial<UsersDocument> = {
      username: data?.username,
      email: data?.email,
      firstName: data?.firstName,
      lastName: data?.lastName,
    };

    return await new this._userDb(userData).save();
  }

  private async _getUserData(username: string): Promise<UsersDocument> {
    return await this._userDb.findOne({ username });
  }

}
