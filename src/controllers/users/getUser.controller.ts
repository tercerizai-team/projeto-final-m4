import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { getUserService } from "../../services/users/getUser.services";

export const getUserController = async (req: Request, res: Response) => {
    const id = req.params.id
    const user = await getUserService(id)
    return res.status(200).json(instanceToPlain(user))
}