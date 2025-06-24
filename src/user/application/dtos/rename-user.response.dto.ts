import { IUser } from '@user/domain/entities/user.entity'
import { Expose } from 'class-transformer'

export class RenameUserResponseBodyDTO implements IUser {
  @Expose()
  id: string

  @Expose()
  name: string
}
