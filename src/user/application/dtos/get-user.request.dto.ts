import { IsString, IsUUID } from 'class-validator'

export class GetUserParamsDTO {
  @IsString()
  @IsUUID()
  id: string
}

export type GetUserInputDTO = GetUserParamsDTO
