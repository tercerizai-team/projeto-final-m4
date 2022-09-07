import { Request, Response } from "express";
import { createUserService } from "../../services/users/createUser.services";
import { AppError, handleError } from "../../errors/AppError";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, isAdm } = req.body
        const user = await createUserService({name, email, password, phone, isAdm})
        return res.status(201).send(user)  
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res)
        }
    }
}