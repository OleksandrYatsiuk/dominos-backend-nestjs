import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UsersSchema } from '@schemas/users.schema';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsS3Service } from '@services/aws.service';
import { AuthModule } from 'src/module-auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AwsS3Service],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    MulterModule.registerAsync({ useFactory: () => ({}) }),
  ],
  exports: []
})
export class UsersModule { }
