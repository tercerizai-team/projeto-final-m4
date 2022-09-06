import { Request, Response } from "express";


export const createUserController = async (req: Request, res: Response) => {

    res.status(200).json("esta funcionando!!!!")

}