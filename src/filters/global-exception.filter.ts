import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse = 'Internal Server Error';

    // Проверка, если исключение является экземпляром HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Если ошибка - это объект, мы проверяем, является ли она вложенной ошибкой (например, BadRequestException с { success: false, error })
      if (typeof exceptionResponse === 'object' && 'success' in exceptionResponse) {
        // Применяем корректный формат ошибок (например, не возвращать вложенную ошибку)
        errorResponse = exceptionResponse['error'] || exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        errorResponse = exceptionResponse['message'] || exceptionResponse;
      } else {
        // Иначе просто выводим стандартное сообщение об ошибке
        errorResponse = exceptionResponse;
      }
    }

    // Формируем ответ
    const error = {
      success: false,
      error: errorResponse,
    };

    response.status(status).json(error);
  }
}
