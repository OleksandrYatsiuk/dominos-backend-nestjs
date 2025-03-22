import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.esprc.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DATABASE_NAME}`,
            // uri: `mongodb://mongodb:27017/dominos`,
        };
    }
}
