import { Request, Response } from "express";
import updateAddressService from "../../services/addresses/updateAddress.services";


const updateAddressController = async (req: Request, res: Response) => {

    const {state, street, district, number, complement, city, zipCode} = req.body
    const {id} = req.params
    const userId = req.userId
    const isAdm = req.userIsAdm

    const updateAddress = await updateAddressService({state, street, district, number, complement, city, zipCode}, id, userId, isAdm)

    return res.status(200).send(updateAddress)
}

export default updateAddressController