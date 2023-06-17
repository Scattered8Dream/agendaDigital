import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { sign } from "jsonwebtoken";

import KnexConnection from "../database/connection";
import AppError from "../errors/AppError";

import authConfig from "../config/auth";

interface IReqCreateUser {
  name: string;
  email: string;
  password: string;
}

interface IReqSession {
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

  public async session(requestData: IReqSession) {
    try {
      const { email, password } = requestData;

      const user = await KnexConnection("users").where("email", email).first();

      if (!user) {
        throw new AppError("User not found", 404);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AppError("Invalid password", 400);
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: user.userId,
        expiresIn,
      });

      return {
        userId: user.userId,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        token,
      };
    } catch (sessionError) {
      console.error({ sessionError });

      throw new AppError("Error when session user", 500);
    }
  }
}

export default UserController;
