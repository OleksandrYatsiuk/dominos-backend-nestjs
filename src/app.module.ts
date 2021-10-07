import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose-config.service';
import { PizzasModule } from './module-pizzas/pizzas.module';
import { UsersModule } from './module-users/users.module';
import { DrinksModule } from './module-drinks/drinks.module';
import { PromotionsModule } from './module-promotions/promotions.module';
import { IngredientsModule } from './module-ingredients/ingredients.module';
import { ShopsModule } from './module-shops/shops.module';
import * as path from 'path';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ValidationFilter } from './filters/validation.filter';
import { AllExceptionsFilter } from './filters/all-exception';
import { ELanguage } from '@models/language.model';
import { LangInterceptor } from './interceptors/lang.interceptor';
import { LanguageModule } from './module-language/language.module';
import { PizzaStatusesModule } from './pizza-statuses/pizza-statuses.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    I18nModule.forRoot({
      fallbackLanguage: ELanguage.uk,
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },

    }),
    PizzasModule,
    PizzaStatusesModule,
    UsersModule,
    DrinksModule,
    PromotionsModule,
    IngredientsModule,
    ShopsModule,
    LanguageModule,
    TasksModule
  ],
  controllers: [],
  exports: [LanguageModule],
  providers: [MongooseConfigService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LangInterceptor
    }
  ],
})
export class AppModule { }
