import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { AppService } from './app.service';
import { DatabaseModule } from './db';
import { LoggerModule } from './logger';

import { DefaultModule } from './default';

@Module({
  exports: [AppService],
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    DatabaseModule,
    LoggerModule,
    DefaultModule,
  ],
  providers: [AppService],
})
export class AppModule {}
