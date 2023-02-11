import { pinoLoggerConfig } from '@libs/common/logger/logger';
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot(pinoLoggerConfig),
    CqrsModule],
  providers: [

  ],
  exports: [CqrsModule],
})
export class CoreModule {}
