import { Provider } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ResponseFilter } from './filters/response.filter'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { ResponseInterceptor } from './interceptors/response.interceptor'
import { ValidationPipe } from './pipe/validation.pipe'

export const HTTPProvider = {
  LoggingInterceptor: APP_INTERCEPTOR,
  ValidationPipe: APP_PIPE,
  ResponseInterceptor: APP_INTERCEPTOR,
  ResponseFilter: APP_FILTER,
}

const LoggingInterceptorProvider: Provider = {
  provide: HTTPProvider.LoggingInterceptor,
  useClass: LoggingInterceptor,
}
const ValidationPipeProvider: Provider = {
  provide: HTTPProvider.ValidationPipe,
  useClass: ValidationPipe,
}
const ResponseInterceptorProvider: Provider = {
  provide: HTTPProvider.ResponseInterceptor,
  useClass: ResponseInterceptor,
}
const ResponseFilterProvider: Provider = {
  provide: HTTPProvider.ResponseFilter,
  useClass: ResponseFilter,
}

const HTTPProviders = [
  LoggingInterceptorProvider,
  ValidationPipeProvider,
  ResponseInterceptorProvider,
  ResponseFilterProvider,
]

export default HTTPProviders
