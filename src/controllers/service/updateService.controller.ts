import { Request, Response } from "express";
import { updateServiceService } from "../../services/service/updateService.service";

export const updateServiceController = async (req: Request, res: Response) => {
  const userId = req.userId;
  const isAdm = req.userIsAdm;
  const serviceId = req.params.serviceId;
  const {
    isServiceFinished,
    isServiceCanceled,
    clientFinished,
    providerFinished,
  } = req.body;

  const updateService = await updateServiceService(
    { isServiceFinished, isServiceCanceled, clientFinished, providerFinished },
    serviceId,
    userId,
    isAdm
  );
  return res.status(200).json(updateService);
};
