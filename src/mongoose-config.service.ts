import { Injectable } from '@nestjs/common';
import {
    MongooseModuleOptions,
    MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.9ab1f.mongodb.net/${process.env.DATABASE_NAME}`,
            // uri: `mongodb://mongodb:27017/dominos`,
            useFindAndModify: false, useNewUrlParser: true
        };
    }
}
