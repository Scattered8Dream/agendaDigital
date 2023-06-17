import { Router } from "express";

import EventController from "../controller/eventController";
import ensureAuthenticated from "../middleware/ensureAuthenticated";

const CalendarRouter = Router();
const eventController = new EventController();

CalendarRouter.post("/", ensureAuthenticated, async (request, response) => {
  const { event_id, title, start, end } = request.body;
  const userId = request.user.userId;

  const createdEvent = await eventController.createEvent({
    event_id,
    title,
    start,
    end,
    userId,
  });

  return response.json(createdEvent);
});

CalendarRouter.put(
  "/:eventId",
  ensureAuthenticated,
  async (request, response) => {
    const { eventId } = request.params;
    const { events } = request.body;

    const updatedEvent = await eventController.editEvent({
      eventId,
      events,
    });

    return response.json(updatedEvent);
  }
);

CalendarRouter.get("/", ensureAuthenticated, async (request, response) => {
  const userId = request.user.userId;

  const events = await eventController.getEventsByUser(userId);

  return response.json(events);
});

export default CalendarRouter;
