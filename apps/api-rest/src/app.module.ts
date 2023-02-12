import { Global, Module } from '@nestjs/common';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, RouterModule } from '@nestjs/core';
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

    RouterModule.register([]),
    CoreModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
