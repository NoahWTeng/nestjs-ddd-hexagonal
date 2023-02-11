import { CacheModule, Global, Module } from '@nestjs/common';
import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { CoreModule } from '@libs/core/core.module';
import { ErrorsInterceptor } from '@libs/common/interceptors/error.interceptor';
import { DatabaseModule } from '@libs/database/database.module';


// CONFIG
config();
@Global()
@Module({
  imports: [
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


    RouterModule.register([]),
    CoreModule,
    DatabaseModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
