import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const PostgresTypeormConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USERNAME'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB_NAME'),
  entities: [],
  autoLoadEntities: true,
  connectTimeoutMS: 2000,
  logging: ['error', 'migration', 'schema'],
  verboseRetryLog: true,
  synchronize: true,
});
