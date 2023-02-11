import { ConfigService } from '@nestjs/config';

import { MongooseModuleOptions } from '@nestjs/mongoose';
export const MongooseConfig = (configService: ConfigService): MongooseModuleOptions => ({
  uri: configService.get('MONGO_HOST'),
  user: configService.get('MONGO_USERNAME'),
  pass: configService.get('MONGO_PASSWORD'),
  dbName: configService.get('MONGO_DB_NAME'),
  connectTimeoutMS: 2000,
  autoIndex: true,
});
