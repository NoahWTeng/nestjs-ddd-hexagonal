import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mongodbConfig } from './mongo/mongo.config';
import { mongodbProviders } from './mongo/mongo.providers';

@Module({
  imports: [ConfigModule.forFeature(mongodbConfig)],
  providers: [...mongodbProviders],
  exports: [],
})
export class DatabaseModule { }