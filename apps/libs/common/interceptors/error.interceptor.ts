import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ErrorsInterceptor implements ExceptionFilter {
  public catch(error: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message: string | object = error.message;

    if (error.getResponse && error.getResponse()) {
      message = error.getResponse()['message'];
    }
    const status = error.getStatus();

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
