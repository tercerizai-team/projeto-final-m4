import { Request, Response } from "express";
import { deleteServiceService } from "../../services/service/deleteService";

export const deleteServiceController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const isAdm = req.userIsAdm;
  const serviceId = req.params.serviceId;
  await deleteServiceService(serviceId, userId, isAdm);
  return res.status(200).send();
};
