import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import KnexConnection from "../database/connection";
import AppError from "../errors/AppError";

interface IReqCreateUser {
  name: string;
  email: string;
  password: string;
}

class UserController {
  public async createUser(requestData: IReqCreateUser) {
    try {
      const { name, email, password } = requestData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4();
      const createdAt = new Date().toISOString();

      const createdUser = await KnexConnection("users")
        .insert({
          userId,
          name,
          email,
          password: hashedPassword,
          createdAt,
        })
        .returning(["userId", "name", "email", "createdAt"]);

      return createdUser[0];
    } catch (createUserError) {
      console.error({ createUserError });

      throw new AppError("Error when creating user", 500);
    }
  }
}

export default UserController;
