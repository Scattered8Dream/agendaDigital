import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";

import AppError from "./errors/AppError";

import UsersRouter from "./routes/user.routes";
import CalendarRouter from "./routes/calendar.routes";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: "Error", message: err.message });
  }

  console.error({ err });

  return response
    .status(500)
    .json({ status: "Error", message: "Internal server error" });
});

app.use("/user", UsersRouter);
app.use("/events", CalendarRouter);

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333");
});
