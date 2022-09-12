import { Request, Response } from "express";
import { ProviderSchedule } from "../../entities/provider_schedule.entity";
import deleteProviderScheduleService from "../../services/providersSchedules/deleteProviderSchedule.services";

export const deleteProviderScheduleController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  await deleteProviderScheduleService(id);
  res.json({ message: "Deleted with success" });
};
