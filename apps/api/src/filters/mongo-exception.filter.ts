import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';

@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception?.code === 11000) {
      const field = Object.keys(exception.keyValue)[0];
      const value = exception.keyValue[field];
      this.logger.error(`Duplicate key error: ${field} = "${value}"`);
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: `The ${field} "${value}" already exists`,
      });
    }

    if (exception?.name === 'ValidationError') {
      const messages = Object.values(exception.errors).map(
        (err: any) => err.message,
      );
      this.logger.error(`Validation error: ${messages.join('; ')}`);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: messages,
      });
    }

    this.logger.error('Unhandled error', exception.stack || exception.message);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
