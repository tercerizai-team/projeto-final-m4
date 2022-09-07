import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

export const isAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userIsAdm = req.userIsAdm

    if (userIsAdm === false) {
        throw new AppError('Access denied', 401)
    }

    next()
}