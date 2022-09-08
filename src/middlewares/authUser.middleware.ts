import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";

export const authUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      req.userEmail = decoded.email;
      req.userId = decoded.userId;
      req.userIsAdm = decoded.userIsAdm;
      next();
    }
  );
};
