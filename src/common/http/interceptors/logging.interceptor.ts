import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()
    const requestTimestamp = new Date()
    request.timestamp = requestTimestamp

    return next.handle().pipe(
      tap((data: unknown) => {
        const { method, originalUrl, ip } = request
        const { statusCode } = response

        const duration = Date.now() - requestTimestamp.getTime()
        this.logger.log(
          `${ip ?? 'unknown-ip'} [${requestTimestamp.toISOString()}] ${method} ${originalUrl} - ${statusCode} ${duration}ms`,
        )

        return data
      }),
    )
  }

  formatLog(args: {
    ip?: string
    requestTimestamp: Date
    method: string
    url: string
    statusCode: number
    duration: number
  }): string {
    const { ip, requestTimestamp, method, url, statusCode, duration } = args
    return `${ip ?? 'unknown-ip'} [${requestTimestamp.toISOString()}] ${method} ${url} - ${statusCode} ${duration}ms`
  }
}
