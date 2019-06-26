import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);
  const config = appService.getConfig();
  const appPort = config.get('app.port');

  await app.listen(appPort);

  Logger.log(`App started at PORT ${appPort}`, 'App');
}
bootstrap();
