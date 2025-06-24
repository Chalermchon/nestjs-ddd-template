import { ModelDefinition } from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema'

export const MongoDBModel = {
  User: 'User',
}

export const MongoDBModels: ModelDefinition[] = [
  { name: MongoDBModel.User, schema: UserSchema },
]
