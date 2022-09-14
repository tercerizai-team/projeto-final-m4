import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { createProviderService } from "../../services/providers/createProvider.services";

export const createProviderController = async (req: Request, res: Response) => {
  const newProvider = await createProviderService(req.body);
  return res.status(201).json(instanceToPlain(newProvider));
};
