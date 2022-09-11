import { Request, Response } from "express";
import { createNewProviderScheduleService } from "../../services/providersSchedules/providersSchedules.services";


export const createNewProviderScheduleController = async (req: Request, res: Response) => {

    const { day, initHour, limitHour } = req.body

    const userId = req.userId

    const newProviderSchedule = await createNewProviderScheduleService({ day, initHour, limitHour }, userId)

    return res.status(201).json(newProviderSchedule)
}