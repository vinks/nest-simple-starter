import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { AppService } from './app.service';

import { DefaultModule } from './default';

@Module({
  exports: [AppService],
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    DefaultModule,
  ],
  providers: [AppService],
})
export class AppModule {}
