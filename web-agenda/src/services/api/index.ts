import axios, { AxiosInstance } from 'axios'

import { Users } from './Users'
import { Events } from './Event'

export class API {
  private instance: AxiosInstance

  users: Users
  events: Events

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3333',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.users = new Users(this.instance)
    this.events = new Events(this.instance)
  }
}

export const useAPI = () => {
  const api = new API()

  return { api }
}
