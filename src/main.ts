import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { config } from 'aws-sdk';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Back-end Template')
    .setDescription('The Back-end Template API description')
    .setVersion('1.0')
    .addTag('template')
    .addBearerAuth({
      type: 'http',
      name: 'Authorization',
      in: 'header',
    })

    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  // Config AWS
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });

  // Use global validation pipe.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  app.listen(process.env.PORT || 3000);
}
bootstrap();
