import { AxiosInstance } from 'axios'

import { IEvent, IReqCreateEvent } from './types'

export class Events {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  public async createEvent({
    end,
    event_id,
    start,
    title,
    token
  }: IReqCreateEvent) {
    await this.instance.post(
      '/events',
      {
        end,
        event_id,
        start,
        title
      },
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    )
  }

  public async getEventsByUser(token: string): Promise<IEvent[]> {
    const { data } = await this.instance.get('/events', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    return data
  }
}
