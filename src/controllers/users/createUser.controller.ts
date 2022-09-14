import { Request, Response } from "express";
import { createUserService } from "../../services/users/createUser.services";

export const createUserController = async (req: Request, res: Response) => {

    const { name, email, password, phone, isAdm } = req.body
    const user = await createUserService({name, email, password, phone, isAdm})
    return res.status(201).send(user)  

}