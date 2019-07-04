import { createConnection } from 'typeorm';
import { ConfigService } from 'nestjs-config';

export const databaseProviders = {
    inject: [ConfigService],
    provide: 'DATABASE_CONNECTION',
    useFactory: async (config: ConfigService) => createConnection({
        database: config.get('db.database'),
        type: config.get('db.type'),
        host: config.get('db.host'),
        port: config.get('db.port'),
        username: config.get('db.username'),
        password: config.get('db.password'),
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: config.get('db.synchronize'),
    }),
};
