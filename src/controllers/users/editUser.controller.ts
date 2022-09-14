import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { editUserService } from "../../services/users/editUser.service";

export const editUserController = async (req: Request, res: Response) => {

    const {id} = req.params
    const isAdmReq = req.userIsAdm
    const userId = req.userId
    const {name, email, password, phone, isAdmBody} = req.body

    const userEdit = await editUserService({name, email, password, phone, isAdmBody}, isAdmReq, id, userId)

    return res.status(200).send(instanceToPlain(userEdit))
}