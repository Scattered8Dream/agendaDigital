import axios, { AxiosInstance } from 'axios'

import { Users } from './Users'

export class API {
  private instance: AxiosInstance

  users: Users

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3333',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.users = new Users(this.instance)
  }
}

export const useAPI = () => {
  const api = new API()

  return { api }
}
