import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';
import setDefaultUser from './config/default-user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const doc = new DocumentBuilder()
    .setTitle('TP_backend')
    .addBearerAuth()
    .setDescription('Pre-liminar version of TP project')
    .setVersion('0.1')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'https://www.educhainapp.com/',
      'https://educhainapp.com/'
    ],
    methods: ["GET", "POST","PUT","PATCH","DELETE"],
    credentials: true,
  });
  const configService = app.get(ConfigService);
  setDefaultUser(configService);
  const port = +configService.get<number>(SERVER_PORT) || 3000;
  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0');
}
bootstrap();
