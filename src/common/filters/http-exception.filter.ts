import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    if (status === 403) {
      error = { ...error, message: '权限不足' };
    }
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
