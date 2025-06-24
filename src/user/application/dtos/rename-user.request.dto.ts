import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class RenameUserParamsDTO {
  @IsString()
  @IsUUID()
  id: string
}

export class RenameUserRequestBodyDTO {
  @IsString()
  @IsNotEmpty()
  name: string
}

export type RenameUserInputDTO = RenameUserParamsDTO & RenameUserRequestBodyDTO
