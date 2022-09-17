import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize';

@Catch()
export class CustomeExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor(private readonly httpAdapter: HttpAdapterHost) {
    this.logger = new Logger();
  }

  catch(
    exception:
      | ValidationError
      | UniqueConstraintError
      | ForeignKeyConstraintError
      | any,
    host: ArgumentsHost,
  ): void {
    let messages: string | string[] = 'Something went wrong!';

    const ctx = host.switchToHttp();

    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception?.name === 'SequelizeValidationError') {
      statusCode = HttpStatus.BAD_REQUEST;
      messages = exception.errors.map((err: any) => err.message);
    }

    if (exception && exception?.name === 'SequelizeUniqueConstraintError') {
      statusCode = HttpStatus.BAD_REQUEST;
      messages = exception.errors.map((err: any) => err.message);
    }

    if (exception.errors) {
      messages = exception.errors.map((err: any) => err.message);
    }

    console.log(exception);

    const logBody: any = {
      statusCode,
      path: request.url,
      method: request.method,
      errorName: exception?.name,
      message: messages,
    };

    const responseBody = {
      statusCode,
      success: false,
      messages,
    };
    this.logger.error(
      `Request Method : ${request.method} | Request Path : ${
        request.url
      } | Error : ${JSON.stringify(logBody)}`,
    );

    return response.status(statusCode).json(responseBody);
  }
}
