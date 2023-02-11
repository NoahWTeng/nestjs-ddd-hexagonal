import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mongoModelsProviders } from './mongo/mongo-models.providers';
import { mongodbConfig } from './mongo/mongo.config';
import { mongodbProviders } from './mongo/mongo.providers';

const providers = [...mongodbProviders,...mongoModelsProviders]

@Module({
  imports: [ConfigModule.forFeature(mongodbConfig)],
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule { }