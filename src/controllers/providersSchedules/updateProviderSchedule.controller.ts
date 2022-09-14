import { Request, Response } from "express";
import updateProviderScheduleService from "../../services/providersSchedules/updateProviderSchedule.services";

export const updateProviderScheduleController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const dayHourData = req.body;
  await updateProviderScheduleService(dayHourData, id);
  return res.json({ message: "Day hours updated" });
};
