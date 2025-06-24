import { Inject, Injectable } from '@nestjs/common'
import { DomainServiceProvider } from '@user/domain'
import { User } from '@user/domain/entities/user.entity'
import { UserDomainService } from '@user/domain/services/user.service'
import { CreateUserInputDTO } from '../dtos/create-user.request.dto'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(DomainServiceProvider.UserDomainService)
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(inputData: CreateUserInputDTO): Promise<User> {
    const newUser = await this.createNewUser(inputData)

    return newUser
  }

  async createNewUser(inputData: CreateUserInputDTO) {
    return this.userDomainService.createUser(inputData)
  }
}
