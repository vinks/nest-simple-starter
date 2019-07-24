import { Logger, HttpService } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { LoggerInterceptor, LoggerService } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get(LoggerService);

  app.useGlobalInterceptors(new LoggerInterceptor(loggerService));

  const appService = app.get(AppService);
  const config = appService.getConfig();
  const appPort = config.get('app.port');

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Nest simple starter')
    .setDescription('Nest simple starter API')
    .setVersion('1.0')
    .addTag('nest-simple-starter')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(appPort);

  Logger.log(`App started at PORT ${appPort}`, 'App');
}
bootstrap();
