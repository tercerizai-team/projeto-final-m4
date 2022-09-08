import { Request, Response } from "express";
import createAddressesService from "../../services/addresses/createAddresses.services";

const createAddressesController = async (req: Request, res: Response) => {
  const { state, city, zipCode, number, street, district, complement } =
    req.body;
  const token = req.userId;

  const address = await createAddressesService(
    { state, city, zipCode, number, street, district, complement },
    token
  );

  return res.status(201).send(address);
};

export default createAddressesController;
