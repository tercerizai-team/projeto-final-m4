import { Request, Response } from "express";
import { deleteAddressService } from "../../services/addresses/deleteAddress.service";

export const deleteAddressController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteAddressService(id);
  return res.json({
    message: "Address deleted",
  });
};
