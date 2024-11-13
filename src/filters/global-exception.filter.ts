import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let errorResponse = 'Internal Server Error';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
  
        // Проверка на то содержит ли ошибка объект с сообщением
        if (typeof exceptionResponse === 'object') {
          errorResponse = exceptionResponse['message'] || exceptionResponse;
        } else {
          errorResponse = exceptionResponse;
        }
      }
  
      // Ответ по нашему формату
      const error = {
        success: false,
        error: errorResponse,
      };
  
      response.status(status).json(error);
    }
  }