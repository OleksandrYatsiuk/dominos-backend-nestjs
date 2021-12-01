import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UsersSchema } from '@schemas/users.schema';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsS3Service } from '@services/aws.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AwsS3Service],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    MulterModule.registerAsync({ useFactory: () => ({}) }),
  ]
})
export class UsersModule { }
