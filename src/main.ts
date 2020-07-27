import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import { TimeoutInterceptor } from './timeout.interceptor';

async function bootstrap() {
  const SERVER_CONFIG_PORT = config.get('server').port;

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(); // setup cors

  app.useGlobalInterceptors(new TimeoutInterceptor());

  const swaggerOptions = new DocumentBuilder() // setup swagger
    .setTitle('Conversation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(SERVER_CONFIG_PORT);
  logger.log(`Application listening on port ${SERVER_CONFIG_PORT}`);
}
bootstrap();
