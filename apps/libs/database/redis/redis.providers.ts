import { ConfigType } from '@nestjs/config';
import { createClient } from 'redis';
import { redisdbConfig } from './redis.config';
import { REDIS_CONNECTION } from './redis.constant';

export type RedisClientType = ReturnType<typeof createClient>;

export const redisdbProviders = [
  {
    provide: REDIS_CONNECTION,
    useFactory: (redisConf: ConfigType<typeof redisdbConfig>): RedisClientType => {
      const conn = createClient({
        password: redisConf.password,
        username: redisConf.username,
        socket: {
          port: redisConf.port,
          host: redisConf.host,
        },
      });

      conn.on('connect', () => console.debug('redis connected!'));

      return conn;
    },
    inject: [redisdbConfig.KEY],
  },
];
