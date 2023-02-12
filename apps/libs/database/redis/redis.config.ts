import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();
export const redisdbConfig = registerAs('redisdb', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  username: process.env.REDIS_USERNAME || 'nestjs',
  password: process.env.REDIS_PASSWORD || 'admin',
}));
