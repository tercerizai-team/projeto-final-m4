import { Request, Response } from "express";
import { createServiceService } from "../../services/service/createService";

export const createServiceController = async (req: Request, res: Response) => {
  const { scheduleId } = req.body;
  const newService = await createServiceService(scheduleId);
  return res.status(201).json(newService);
};
