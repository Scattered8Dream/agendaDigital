import { AxiosInstance } from 'axios'

import { IEvent, IReqCreateEvent, IReqEditEvent } from './types'

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

  public async editEvent({ eventId, events, token }: IReqEditEvent) {
    const { data } = await this.instance.put(
      `/events/${eventId}`,
      { events },
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    )

    return data
  }

  public async deleteEvent(eventId: string, token: string) {
    const { data } = await this.instance.delete(`/events/${eventId}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    return data
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
