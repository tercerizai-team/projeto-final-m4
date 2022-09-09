import { Request, Response } from "express";
import { createScheduleService } from "../../services/schedule/createSchedule.service";

export const createScheduleController = async (req: Request, res: Response) => {
  const newSchedule = await createScheduleService(req.body, req);
  return res.status(201).json(newSchedule);
};
