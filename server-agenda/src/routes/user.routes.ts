import { Router } from "express";

import UserController from "../controller/userController";

const UsersRouter = Router();

const userController = new UserController();

UsersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = await userController.createUser({
    name,
    email,
    password,
  });

  return response.json(createUserService);
});

UsersRouter.post("/session", async (request, response) => {
  const { email, password } = request.body;

  const sessionService = await userController.session({
    email,
    password,
  });

  return response.json(sessionService);
});

export default UsersRouter;
