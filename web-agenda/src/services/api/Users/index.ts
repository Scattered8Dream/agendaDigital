import { AxiosInstance } from 'axios'

import { IReqCreateUser, IReqSession, IUser } from './types'

export class Users {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  public async createUser({
    email,
    name,
    password
  }: IReqCreateUser): Promise<IUser> {
    const { data } = await this.instance.post('/user', {
      email,
      name,
      password
    })

    return data
  }

  public async session({ email, password }: IReqSession): Promise<IUser> {
    const { data } = await this.instance.post('/user/session', {
      email,
      password
    })

    return data
  }
}
