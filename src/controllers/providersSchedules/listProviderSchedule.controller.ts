import { Request, Response } from "express";
import { listAllProviderSchedulesService } from "../../services/providersSchedules/listProviderSchedules.services";


export const listAllProviderSchedulesController = async (req: Request, res: Response) => {

    const userId = req.userId

    const isAdm = req.userIsAdm

    const providerSchedules = await listAllProviderSchedulesService(userId, isAdm)

    return res.json(providerSchedules)

}