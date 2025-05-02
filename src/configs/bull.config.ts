import Bull, { Queue } from 'bull';
import Redis from 'ioredis';
import { env } from '../configs/envs.config';
import { logger } from '../middleware/logger.middleware';

const redisConfig: any = {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || undefined,
};

if (env.NODE_ENV === 'production') {
    redisConfig.tls = {
        rejectUnauthorized: true,
    };
}

const redisClient = new Redis(redisConfig);

redisClient.on('error', (err: Error) => {
    logger.error('Erro na conexão com o Redis:', err);
});

export const exampleQueue: Queue = new Bull('exampleQueue', {
    redis: redisConfig,
    limiter: {
        max: 10,
        duration: 1000,
    },
    defaultJobOptions: {
        removeOnComplete: {
            age: 240,
        },
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
    },
    settings: {
        stalledInterval: 10000,
        maxStalledCount: 2,
    },
});

export const tinyQueue: Queue = new Bull('tinyQueue', {
    redis: redisConfig,
    limiter: {
        max: 10,
        duration: 1000,
    },
    defaultJobOptions: {
        removeOnComplete: {
            age: 240,
        },
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
    },
    settings: {
        stalledInterval: 10000,
        maxStalledCount: 2,
    },

})