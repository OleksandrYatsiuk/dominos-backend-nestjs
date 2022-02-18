import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Drinks, drinksSchema } from '@schemas/drinks.schema';
import { LanguageModule } from 'src/module-language/language.module';
import { AwsS3Service } from '@services/aws.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { DrinksPublicController } from './public/drinks-public.controller';
import { AuthModule } from 'src/module-auth/auth.module';

@Module({
  controllers: [DrinksController, DrinksPublicController],
  imports: [
    MongooseModule.forFeature([{ name: Drinks.name, schema: drinksSchema }]),
    MulterModule.registerAsync({ useFactory: () => ({}) }),
    LanguageModule,
    AuthModule
  ],
  providers: [DrinksService, AwsS3Service]
})
export class DrinksModule { }
