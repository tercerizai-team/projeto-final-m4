import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { getProviderService } from "../../services/providers/getProvider.services"

export const getProviderController = async (req: Request, res: Response) => {
    const id = req.params.id
    const provider = await getProviderService(id)
    return res.status(200).json(instanceToPlain(provider))
}