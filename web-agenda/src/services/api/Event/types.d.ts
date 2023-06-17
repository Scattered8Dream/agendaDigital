import { ProcessedEvent } from '@aldabil/react-scheduler/types'

export interface IReqCreateEvent {
  event_id: string
  title: string
  start: Date
  end: Date
  token: string
}

export interface IEvent {
  userId: string
  eventId: string
  events: ProcessedEvent
  createdAt: string
  updatedAt: string
}
