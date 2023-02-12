import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mongoModelsProviders } from './mongo/mongo-models.providers';
import { mongodbConfig } from './mongo/mongo.config';
import { mongodbProviders } from './mongo/mongo.providers';
import { redisdbConfig } from './redis/redis.config';
import { redisdbProviders } from './redis/redis.providers';

const providers = [...mongodbProviders, ...mongoModelsProviders, ...redisdbProviders];

@Module({
  imports: [ConfigModule.forFeature(mongodbConfig), ConfigModule.forFeature(redisdbConfig)],
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
