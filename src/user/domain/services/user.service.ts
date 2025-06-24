import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { RepositoryProvider } from '..'
import { User } from '../entities/user.entity'
import { UserRepository } from '../repositories/user.repository.interface'

@Injectable()
export class UserDomainService {
  constructor(
    @Inject(RepositoryProvider.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(data: { name: string }): Promise<User> {
    const { name } = data
    const newUser = User.create(name)
    await this.userRepository.save(newUser)
    return newUser
  }

  async saveUpdatedUser(user: User): Promise<User> {
    await this.userRepository.save(user)
    return user
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }
}
