import { Request, Response } from "express";
import  createAddressesService  from "../../services/addresses/createAddresses.services"

const createAddressesController = async (req: Request, res: Response) => {

    const { state, city, zipCode, number, street, district, complement } = req.body

    const address = await createAddressesService({state, city, zipCode, number, street, district, complement})

    return res.status(201).send(address)  

}

export default createAddressesController