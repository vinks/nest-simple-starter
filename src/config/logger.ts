import { env } from '../yenv';

export default {
    level: env.LOGGER_LEVEL || 'debug',
    loggers: ['console'],
    timeFormat: 'YYYY-MM-DD HH:mm:ss',
};
