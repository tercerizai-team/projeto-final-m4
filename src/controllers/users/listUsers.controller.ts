import { Request, Response } from "express";
import { listUsersService } from "../../services/users/listUsers.services";
import { instanceToPlain } from "class-transformer";

export const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService()
    return res.status(200).json(instanceToPlain(users))
}