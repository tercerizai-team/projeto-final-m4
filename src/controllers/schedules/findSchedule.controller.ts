import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { findScheduleService } from "../../services/schedule/findSchedule.service";

export const findScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedule = await findScheduleService(id);
  return res.status(200).json(instanceToPlain(schedule));
};
