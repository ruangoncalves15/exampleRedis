import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Redis
    REDIS_HOST: process.env.REDIS_HOST || 'redis',
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',

    // MySQL
    MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
    MYSQL_PORT: Number(process.env.MYSQL_PORT) || 3306,
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'example_db',

    // CONFS 
    EXAMPLE_CRON: process.env.EXAMPLE_CRON || '*/5 * * * *',
};
