import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import getAddressesService from "../../services/addresses/getAddresses.services";

const getAddressController = async (req: Request, res: Response) => {
  const isAdm = req.userIsAdm;

  const userId = req.userId;

  const address = await getAddressesService(userId, isAdm);
  return res.status(200).json(instanceToPlain(address));
};

export default getAddressController;
