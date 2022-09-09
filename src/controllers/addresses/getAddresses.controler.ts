import { Request, Response } from "express";
import getAddressesService from "../../services/addresses/getAddresses.services";

const getAddressController = async (req: Request, res: Response) => {

    const userId = req.userId;

    const addressId = req.params.id
   
    const address = await getAddressesService(addressId, userId)
    return res.status(200).json(address)
}

export default getAddressController