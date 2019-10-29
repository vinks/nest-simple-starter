import { env } from '../yenv';

export default {
    port: env.EXPRESS_PORT || 3000,
};
