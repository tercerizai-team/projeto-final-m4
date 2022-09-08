import { Request, Response } from "express";
import { createProviderService } from "../../services/provider/createProvider.service";

export const createProviderController = async (req: Request, res: Response) => {
  const newProvider = await createProviderService(req.body);
  return res.status(201).json(newProvider);
};