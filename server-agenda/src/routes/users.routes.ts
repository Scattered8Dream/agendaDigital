import { Router } from "express";

const UsersRouter = Router();

UsersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  return response.json({ name, email, password });
});

export default UsersRouter;
