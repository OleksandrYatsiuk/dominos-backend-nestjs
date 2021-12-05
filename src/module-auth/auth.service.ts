import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UsersDocument } from '@schemas/users.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '@schemas/auth.schema';
import { RegisterDto } from './dto/register.dto';
import { AuthTokens } from 'src/enums/auth-type.enum';
import { LoginDto } from './dto/login.dto';

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
      if (await this._isPasswordValid(data.password, hashData.hash)) {

        const date = new Date();
        const expiredDate = date.setDate(date.getDate() + 1);

        const accessTokenData = await new this._authDb({
          hash: await this._generatePasswordHash('Access Token'),
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
      } else {
        throw new Error('Credentials is invalid.');
      }
    } else {
      throw new Error('Credentials is invalid.');
    }
  }


  async validateUser(token: string) {
    return this._authDb.findOne({ hash: token, type: AuthTokens.ACCESS }).then(tokenData => {
      if (!tokenData) {
        return false;
      }
      const currentDate = new Date();
      if (tokenData.expiredAt.getTime() < currentDate.getTime()) {
        return tokenData.userId;
      } else {
        this._authDb.deleteOne({ _id: tokenData._id }).exec();
      }
      return false;
    })
  }

  private async _createPasswordToken(password: string, userId: mongoose.Types.ObjectId): Promise<AuthDocument> {

    const date = new Date();
    const authData: Partial<AuthDocument> = {
      hash: await this._generatePasswordHash(password),
      userId,
      createdAt: date,
      updatedAt: date,
      type: AuthTokens.PASSWORD,
      expiredAt: null
    }

    return await new this._authDb(authData).save();

  }

  private async _generatePasswordHash(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async _isPasswordValid(hash: string, password: string): Promise<boolean> {
    return bcrypt.compare(hash, password);
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
