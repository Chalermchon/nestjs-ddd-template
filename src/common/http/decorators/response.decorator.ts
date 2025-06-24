import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { ClassConstructor } from 'class-transformer'
import { SerializeInterceptor } from '../interceptors/serialize.interceptor'

export function ResponseBody(dto: ClassConstructor<unknown>) {
  return applyDecorators(UseInterceptors(new SerializeInterceptor(dto)))
}
