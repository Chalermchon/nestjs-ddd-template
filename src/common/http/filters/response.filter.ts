import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class ResponseFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP')
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    const { method, originalUrl, ip } = request
    let status: number
    let error: string | object

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res = exception.getResponse()
      error = res
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      error = { message: 'Internal server error' }
    }

    const duration = request.timestamp
      ? Date.now() - request.timestamp.getTime()
      : ''
    this.logger.error(
      `${ip} [${(request.timestamp ?? new Date()).toISOString()}] ${method} ${originalUrl} - ${status} ${duration}ms`,
      exception instanceof Error ? exception.stack : '',
    )

    response.status(status).json({
      success: false,
      error: {
        statusCode: status,
        ...(typeof error === 'object' ? error : { message: error }),
      },
      timestamp: new Date().toISOString(),
    })
  }
}
