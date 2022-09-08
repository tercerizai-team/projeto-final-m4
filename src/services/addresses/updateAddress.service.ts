import AppDataSource from "../../data-source"
import { Addresses } from "../../entities/addresses.entity"
import AppError from "../../errors/AppError"
import { IAddressUpdate } from "../../interfaces/address.interfaces"


const updateAddressService = async ({state, street, district, number, complement, city, zipCode}: IAddressUpdate, id: string, userId: string, isAdm: boolean) => {

    const addressRepository = AppDataSource.getRepository(Addresses)

    const address = await addressRepository.findOneBy({id})

    if (!address){
        throw new AppError("Address not found", 400)
    }

    // if (state?.length !== 2){
    //     throw new AppError("State must have two characters", 400)
    // }

    const newAddress = {
        state,
        street,
        district,
        number,
        complement,
        city,
        zipCode,
    }

    await addressRepository.update({id}, newAddress)

    const updatedAddress = await addressRepository.findOneBy({id})

    return updatedAddress

}

export default updateAddressService