import { ConfigModule, ConfigType } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { redisdbConfig } from './redis.config';

describe('redisdbConfig', () => {
  let config: ConfigType<typeof redisdbConfig>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(redisdbConfig)],
    }).compile();

    config = module.get<ConfigType<typeof redisdbConfig>>(redisdbConfig.KEY);
  });

  it('should be defined', () => {
    expect(redisdbConfig).toBeDefined();
  });

  it('should contains host key', async () => {
    expect(config.host).toBe('localhost');
  });
  it('should contains port key', async () => {
    expect(config.port).toBe(6379);
  });
  it('should contains username key', async () => {
    expect(config.username).toBe('nestjs');
  });
  it('should contains password key', async () => {
    expect(config.password).toBe('admin');
  });
});
