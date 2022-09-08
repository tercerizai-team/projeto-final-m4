import { Request, Response } from "express";
import { deleteProviderService } from "../../services/providers/deleteProvider.services";

export const deleteProviderController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const isAdm = req.userIsAdm;
  const providerId = req.userId;

  await deleteProviderService(id, isAdm, providerId);
  return res.json({ message: "Provider deleted" });
};
