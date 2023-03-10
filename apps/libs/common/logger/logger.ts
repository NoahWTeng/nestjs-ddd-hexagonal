import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { pino } from 'pino';

export const pinoLoggerConfig = {
  pinoHttp: {
    // Set to `false` to prevent standard serializers from being wrapped.
    wrapSerializers: true,

    customProps: () => ({
      context: 'HTTP',
    }),

    // Define custom serializers
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
    },

    // Define a custom success message
    customSuccessMessage: function (req: Request, res: Response) {
      if (res.statusCode === HttpStatus.OK) {
        return `[${req.method}] - [OK] ${req.url}`;
      }
      return `[${req.method}] - [FAIL] ${req.url}`;
    },
    // Define a custom logger level
    customLogLevel: function (req: Request, res: Response, err: any) {
      if (res.statusCode >= HttpStatus.BAD_REQUEST && res.statusCode < HttpStatus.BAD_GATEWAY) {
        return 'warn';
      } else if (res.statusCode >= HttpStatus.BAD_GATEWAY || err) {
        return 'error';
      } else if (res.statusCode >= HttpStatus.AMBIGUOUS && res.statusCode < HttpStatus.BAD_REQUEST) {
        return 'silent';
      }
      return 'info';
    },

    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        colorize: true,
        levelFirst: true,
      },
    },
  },
};
