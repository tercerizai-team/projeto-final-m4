import { Request, Response } from "express";
import AppError from "../../errors/AppError";
import { softDeleteUserService } from "../../services/users/softDeleteUser.services";

export const softDeleteUserController = async (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) {
        throw new AppError('Missing id value', 400)
    }

    const deleteUser = await softDeleteUserService(id)
    
    return res.status(200).json(deleteUser)
}