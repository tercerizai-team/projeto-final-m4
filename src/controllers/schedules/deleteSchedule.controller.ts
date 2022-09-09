import { Request, Response } from "express";
import { deletedScheduleService } from "../../services/schedule/deleteSchedule.service";

export const deleteScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deletedScheduleService(id);
  return res.status(200).json({
    message: "Schedule deleted",
  });
};
