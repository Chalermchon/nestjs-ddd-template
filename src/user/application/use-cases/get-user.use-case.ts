import { Inject, Injectable } from '@nestjs/common'
import { DomainServiceProvider } from '@user/domain'
import { User } from '@user/domain/entities/user.entity'
import { UserDomainService } from '@user/domain/services/user.service'
import { GetUserInputDTO } from '../dtos/get-user.request.dto'

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(DomainServiceProvider.UserDomainService)
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(inputData: GetUserInputDTO): Promise<User> {
    const user = await this.getUserById(inputData.id)

    return user
  }

  async getUserById(id: string) {
    return this.userDomainService.getById(id)
  }
}
