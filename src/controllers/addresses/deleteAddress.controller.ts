import { Request, Response } from "express";
import { deleteAddressService } from "../../services/addresses/deleteAddress.service";

export const deleteAddressController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.userId
  const addressDeleted = await deleteAddressService(id, userId);
  return res.status(200).json({
    message: "Address deleted",
  });
};
