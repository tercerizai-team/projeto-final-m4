import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

export const isTheOwnerOrAdmMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    if (!id) {
        throw new AppError('Missing id value', 400)
    }

    if (id !== req.userId && req.userIsAdm === false) {
        throw new AppError('You are not the owner id or admin to access', 401)
    }

    next()
}