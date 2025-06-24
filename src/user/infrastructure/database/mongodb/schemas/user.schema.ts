import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { v7 as uuidv7 } from 'uuid'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
class User {
  @Prop({
    type: Types.UUID,
    default: uuidv7,
  })
  _id: string

  @Prop()
  name: string
}

export const UserSchema = SchemaFactory.createForClass(User)
