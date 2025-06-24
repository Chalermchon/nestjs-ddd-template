import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    const { metatype } = metadata
    if (!this.toValidate(metatype)) {
      return value
    }
    const object = plainToInstance(metatype, value ?? {})
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed')
    }
    return value
  }

  private toValidate(metatype: unknown): metatype is ClassConstructor<object> {
    if (!metatype) {
      return false
    }
    const types: ClassConstructor<unknown>[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ]
    return !types.includes(metatype as ClassConstructor<unknown>)
  }
}
