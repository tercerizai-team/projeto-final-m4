import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import getServicesService from "../../services/service/getServicesService";

const getServicesController = async (req: Request, res: Response) => {

  const isAdm = req.userIsAdm;

  const userId = req.userId;

  const services = await getServicesService(userId, isAdm);
  return res.status(200).json(instanceToPlain(services));
};

export default getServicesController;
