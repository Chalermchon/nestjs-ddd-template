import { v7 as uuidv7 } from 'uuid'

export interface IUser {
  id: string
  name: string
}

export class User implements IUser {
  constructor(
    private readonly _id: string,
    private _name: string,
  ) {}

  static create(name: string): User {
    return new User(uuidv7(), name)
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  rename(newName: string) {
    this._name = newName
  }
}
