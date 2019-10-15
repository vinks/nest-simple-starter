import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { I18nModule, QueryResolver } from 'nestjs-i18n';
import { HeaderResolver } from './i18n';
import * as path from 'path';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
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
        I18nModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                path: path.join(__dirname, '/i18n/'),
                filePattern: '*.json',
                fallbackLanguage: config.get('i18n.fallbackLanguage'), // e.g., 'en'
                resolvers: [
                    new QueryResolver(['lang', 'locale', 'l']),
                    new HeaderResolver(config.get('i18n.languages')),
                ],
            }),
            inject: [ConfigService],
        }),
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
    }
}
