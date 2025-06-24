import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserRequestBodyDTO {
  @IsString()
  @IsNotEmpty()
  name: string
}

export type CreateUserInputDTO = CreateUserRequestBodyDTO
