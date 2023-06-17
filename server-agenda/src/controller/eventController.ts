import { v4 as uuidv4 } from "uuid";

import KnexConnection from "../database/connection";
import AppError from "../errors/AppError";

interface IReqCreateEvent {
  event_id: string;
  title: string;
  start: Date;
  end: Date;
  userId: string;
}

interface IReqEditEvent {
  eventId: string;
  events: {
    title?: string;
    start?: Date;
    end?: Date;
  };
}

class EventController {
  public async createEvent(requestData: IReqCreateEvent) {
    try {
      const { event_id, title, start, end, userId } = requestData;

      const eventId = uuidv4();
      const createdAt = new Date().toISOString();
      const updatedAt = new Date().toISOString();

      const createdEvent = await KnexConnection("events")
        .insert({
          eventId,
          userId,
          events: JSON.stringify({ title, start, end, event_id }),
          createdAt,
          updatedAt,
        })
        .returning("*");

      return createdEvent[0];
    } catch (createEventError) {
      console.error({ createEventError });

      throw new AppError("Error when creating event", 500);
    }
  }

  public async editEvent(requestData: IReqEditEvent) {
    try {
      const { eventId, events } = requestData;
      const updatedAt = new Date().toISOString();

      const updatedEvent = await KnexConnection("events")
        .where({ eventId })
        .update({
          events: {
            ...events,
            updatedAt,
          },
        })
        .returning("*");

      if (updatedEvent.length === 0) {
        throw new AppError("Event not found", 404);
      }

      return updatedEvent[0];
    } catch (editEventError) {
      console.error({ editEventError });

      throw new AppError("Error when editing event", 500);
    }
  }

  public async getEventsByUser(userId: string) {
    try {
      const events = await KnexConnection("events")
        .where({ userId })
        .select("*");

      return events.map((event) => ({
        ...event,
        events: JSON.parse(event.events),
      }));
    } catch (getEventsError) {
      console.error({ getEventsError });

      throw new AppError("Error when retrieving events", 500);
    }
  }
}

export default EventController;
