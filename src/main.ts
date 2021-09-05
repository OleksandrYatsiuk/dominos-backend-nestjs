import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PaginatedDto } from '@models/pagination.model';
import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './filters/validation.exception';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: 'Content-Type, Authorization, Accept, Origin'
    },

  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const options = new DocumentBuilder()
    .setTitle('DOMINOS API')
    .setDescription('Dominos Backend API Documentation')
    .addBearerAuth()
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, { extraModels: [PaginatedDto] });
  SwaggerModule.setup('/', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      stopAtFirstError: true,
      exceptionFactory: (e) => new ValidationException(e)
    }));


  await app.listen(3000);

  console.log(`\n Application is running on: ${await app.getUrl()}`);
}
bootstrap();
