import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { createNewProviderScheduleService } from "../../services/providersSchedules/createProvidersSchedules.services";


export const createNewProviderScheduleController = async (req: Request, res: Response) => {

    const { day, initHour, limitHour } = req.body

    const userId = req.userId

    const newProviderSchedule = await createNewProviderScheduleService({ day, initHour, limitHour }, userId)

    return res.status(201).json(instanceToPlain(newProviderSchedule))
}