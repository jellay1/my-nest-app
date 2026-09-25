import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './modules/app/app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './modules/common/global-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown properties
      forbidNonWhitelisted: true, //rejects extra fields
      transform: true, //converts plain request data into your DTO class instance
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('My Nest App API')
    .setDescription('Owner and pet management API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

// entry point
//mo dicatate sa nestjs aha nga compiled file ang execute una 