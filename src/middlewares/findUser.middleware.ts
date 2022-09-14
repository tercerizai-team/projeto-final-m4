import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entity";
import AppError from "../errors/AppError";

export const findUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(Users);
  const userId = req.userId;

  next();
};
