import AppDataSource from "../../data-source"
import { Addresses } from "../../entities/addresses.entity"
import { AddressesUsers } from "../../entities/addresses_users.entity"
import AppError from "../../errors/AppError"
import { IAddressUpdate } from "../../interfaces/address.interfaces"


const updateAddressService = async ({state, street, district, number, complement, city, zipCode}: IAddressUpdate, id: string, userId: string, isAdm: boolean) => {

    const addressRepository = AppDataSource.getRepository(Addresses)
    const addressesUsersRepository = AppDataSource.getRepository(AddressesUsers)


    const pivotAddresses = await addressesUsersRepository.find()
    const address = await addressRepository.findOneBy({id})

    if (!address){
        throw new AppError("Address not found", 400)
    }

    const addressToPatch = pivotAddresses.find(elem => elem.address.id === id)

    if (addressToPatch?.user.id !== userId && isAdm === false){
        throw new AppError("You do not have permission", 400)
    }


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