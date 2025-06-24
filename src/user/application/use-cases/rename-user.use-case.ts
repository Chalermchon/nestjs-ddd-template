import { Inject, Injectable } from '@nestjs/common'
import { DomainServiceProvider } from '@user/domain'
import { User } from '@user/domain/entities/user.entity'
import { UserDomainService } from '@user/domain/services/user.service'
import { RenameUserInputDTO } from '../dtos/rename-user.request.dto'

@Injectable()
export class RenameUserUseCase {
  constructor(
    @Inject(DomainServiceProvider.UserDomainService)
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(inputData: RenameUserInputDTO): Promise<User> {
    let user = await this.getUserById(inputData.id)

    user = await this.renameUser(user, inputData.name)

    return user
  }

  async getUserById(id: string) {
    return this.userDomainService.getById(id)
  }

  async renameUser(user: User, newName: string) {
    user.rename(newName)
    await this.userDomainService.saveUpdatedUser(user)
    return user
  }
}
