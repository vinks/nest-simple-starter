import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ServeFaviconMiddleware } from '@nest-middlewares/serve-favicon';
import { AppService } from './app.service';
import { DatabaseModule } from './db';
import { LoggerModule } from './logger';

import { DefaultModule } from './default';

@Module({
    exports: [AppService],
    imports: [
        ConfigModule.load(
            path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'),
        ),
        DatabaseModule,
        LoggerModule,
        DefaultModule,
    ],
    providers: [AppService],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(CookieParserMiddleware).forRoutes('*');
        consumer.apply(HelmetMiddleware).forRoutes('*');
        consumer.apply(CorsMiddleware).forRoutes('*');
        // consumer.apply(ServeFaviconMiddleware).forRoutes('*');
    }
}
