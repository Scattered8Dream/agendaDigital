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

export default UsersRouter;
