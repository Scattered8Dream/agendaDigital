import { Router } from "express";

import UsersRouter from "./users.routes";

const RouterRouter = Router();

RouterRouter.use("/users", UsersRouter);

export default RouterRouter;
