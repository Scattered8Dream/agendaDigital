import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "express-async-errors";

import RouterRouter from "./routes";

const app = express();
app.use(express.json());

app.use(RouterRouter);

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333");
});
