import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from '@schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from '@schemas/users.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: User.name, schema: UsersSchema }]),
  ],
  exports: [AuthService],
})
export class AuthModule { }
