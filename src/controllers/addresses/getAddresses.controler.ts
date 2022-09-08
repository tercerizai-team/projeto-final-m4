import { Request, Response } from "express";
import getAddressesService from "../../services/addresses/getAddresses.services";

const getAddressController = async (req: Request, res: Response) => {
    const id = req.params.id
   
    const address = await getAddressesService(id)
    return res.status(200).json(address)
}

export default getAddressController