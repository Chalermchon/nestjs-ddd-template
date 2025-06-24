import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UseCases } from './application'
import { DomainServiceProvider, RepositoryProvider } from './domain'
import { UserDomainService } from './domain/services/user.service'
import { Controllers } from './entrypoints'
import { MongoDBModels } from './infrastructure/database/mongodb'
import { MongoDBUserRepository } from './infrastructure/database/mongodb/repositories/user.repository'

@Module({
  imports: [MongooseModule.forFeature(MongoDBModels)],
  controllers: [...Controllers],
  providers: [
    {
      provide: DomainServiceProvider.UserDomainService,
      useClass: UserDomainService,
    },

    {
      provide: RepositoryProvider.UserRepository,
      useClass: MongoDBUserRepository,
    },

    ...UseCases,
  ],
})
export class UserModule {}
