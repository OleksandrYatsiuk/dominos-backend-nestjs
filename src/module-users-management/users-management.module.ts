import { Module } from '@nestjs/common';
import { UsersManagementService } from './users-management.service';
import { UsersManagementController } from './users-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from '@schemas/users.schema';
import { Auth, AuthSchema } from '@schemas/auth.schema';
import { AuthService } from 'src/module-auth/auth.service';

@Module({
  controllers: [UsersManagementController],
  providers: [UsersManagementService, AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UsersSchema },
      { name: Auth.name, schema: AuthSchema }
    ]),
  ]
})
export class UsersManagementModule { }
