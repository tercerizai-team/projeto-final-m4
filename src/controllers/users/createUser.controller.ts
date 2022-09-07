import { Request, Response } from "express";
import { createUserService } from "../../services/users/createUser.service";
import { AppError, handleError } from "../../errors/AppError";

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, isAdm } = req.body
        const newUser = await createUserService({name, email, password, phone, isAdm})
        return res.status(201).send(newUser)  
    } catch (error) {
        if (error instanceof AppError) {
            handleError(error, res)
        }
    }
}