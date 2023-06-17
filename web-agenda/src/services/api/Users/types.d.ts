export interface IReqCreateUser {
  name: string
  email: string
  password: string
}

export interface IUser {
  userId: string
  name: string
  email: string
  createdAt: string
  token: string
}

export interface IReqSession {
  email: string
  password: string
}
