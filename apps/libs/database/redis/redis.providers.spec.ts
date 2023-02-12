jest.mock('redis', () => ({
  createClient: jest.fn().mockImplementation((url: any, options: any) => {
    const conn = {
      on: jest.fn(),
      quit: jest.fn(),
    };
    return conn;
  }),
}));

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { createClient } from 'redis';
import { redisdbConfig } from './redis.config';
import { REDIS_CONNECTION } from './redis.constant';
import { RedisClientType, redisdbProviders } from './redis.providers';

describe('RedisProvider', () => {
  let conn: RedisClientType;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(redisdbConfig)],
      providers: [...redisdbProviders],
    }).compile();

    conn = module.get<RedisClientType>(REDIS_CONNECTION);
  });

  afterAll(async () => {
    await conn.quit();
    await module.close();
  });

  it('REDIS_CONNECTION should be defined', () => {
    expect(conn).toBeDefined();
  });

  it('connect is called', () => {
    expect(createClient).toHaveBeenCalledWith({
      password: 'admin',
      username: 'nestjs',
      socket: {
        port: 6379,
        host: 'localhost',
      },
    });
  });

  it('connect on is called', () => {
    expect(conn.on).toHaveBeenCalled();
  });
});
