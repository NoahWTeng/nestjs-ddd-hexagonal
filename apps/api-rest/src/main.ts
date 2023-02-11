import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

// Swagger configuration
function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle(process.env.TITLE)
    .setDescription(process.env.DESCRIPTION)
    .setVersion(process.env.VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  app.enableCors({
    origin: process.env.CORS,
    credentials: true,
  });

  app.setGlobalPrefix(`api/${process.env.VERSION}`);
  // Swagger

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(json({ limit: process.env.JSON_LIMIT }));

  setupSwagger(app);

  app.listen(process.env.PORT);

  console.debug({
    port: process.env.PORT,
    version: process.env.VERSION,
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
    jsonLimit: process.env.JSON_LIMIT,
    mongodb: process.env.MONGO_URI,
    redis: process.env.REDIS_HOST,
    cors: process.env.CORS
  });
}
(async () => await bootstrap())();
