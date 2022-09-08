import { Request, Response } from "express";
import { updateProviderService } from "../../services/providers/updateProvider.service";

export const updateProviderController = async (req: Request, res: Response) => {
  const providerData = req.body;
  const id = req.params.id;
  const isAdm = req.userIsAdm;
  const providerId = req.userId;

  const newProvider = await updateProviderService(
    providerData,
    id,
    isAdm,
    providerId
  );
  return res.json(newProvider);
};
