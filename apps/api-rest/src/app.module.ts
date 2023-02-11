import { CacheModule, Global, Module } from '@nestjs/common';
import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfig } from '@libs/database/mongo/mongo-orm.config';
import { LoggerModule } from 'nestjs-pino';
import { ErrorsInterceptor } from '@libs/common/interceptors/error.interceptor';
import { CoreModule } from '@libs/core/core.module';
import { pinoLoggerConfig } from '@libs/common/logger/logger';

// CONFIG
config();
@Global()
@Module({
  imports: [
    LoggerModule.forRoot(pinoLoggerConfig),

    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `./environments/${process.env.NODE_ENV}.env` : '.env',
      isGlobal: true,
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => ({
        store: (await redisStore.redisStore({ ttl: configService.get('REDIS_CACHING_TTL') })).getClient(),
      }),
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => MongooseConfig(configService),
    }),

    RouterModule.register([]),
    CoreModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
