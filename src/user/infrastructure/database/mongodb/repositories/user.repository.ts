import { InjectModel } from '@nestjs/mongoose'
import { User } from '@user/domain/entities/user.entity'
import { UserRepository } from '@user/domain/repositories/user.repository.interface'
import { Model } from 'mongoose'
import { MongoDBModel } from '..'
import { UserDocument } from '../schemas/user.schema'

export class MongoDBUserRepository implements UserRepository {
  constructor(
    @InjectModel(MongoDBModel.User)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userDoc = await this.userModel.findById(id).exec()
    return this.toDomain(userDoc)
  }

  async save(user: User): Promise<void> {
    const existingDocument = await this.userModel.findById(user.id)
    const updatedDoc = this.toDal(user)
    if (existingDocument) {
      await this.userModel.updateOne(
        { _id: user.id },
        { ...updatedDoc },
        { timestamps: { createdAt: false } },
      )
    } else {
      await this.userModel.create(updatedDoc)
    }
  }

  private toDomain(userDoc: UserDocument | null): User | null {
    if (!userDoc) {
      return null
    }
    return new User(userDoc._id, userDoc.name)
  }

  private toDal(user: User): UserDocument {
    return new this.userModel({
      _id: user.id,
      name: user.name,
    }).toObject()
  }
}
