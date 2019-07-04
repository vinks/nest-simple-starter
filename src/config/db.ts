export default {
    type: 'mysql',
    host: process.env.TYPEORM_HOST || 'localhost',
    username: process.env.TYPEORM_USERNAME || 'root',
    password: process.env.TYPEORM_PASSWORD || '',
    database: process.env.TYPEORM_DATABASE || 'default',
    port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    logging: 'true',
    synchronize: 'true',
};
