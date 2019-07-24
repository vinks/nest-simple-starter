import { Module } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { LoggerService } from './logger.service';

@Module({
  providers: [
    {
      provide: LoggerService,
      useFactory: (config: ConfigService) => {
        return new LoggerService({
          level: config.get('logger.level'),
          loggers: config.get('logger.loggers'),
          timeFormat: config.get('logger.timeFormat'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
