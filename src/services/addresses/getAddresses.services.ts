import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import AppError from "../../errors/AppError";

const getAddressesService = async (id: string) => {
    const addressRepository = AppDataSource.getRepository(Addresses)
    const address = await addressRepository.findOneBy({id: id})

    if (!address) {
        throw new AppError('Address not found', 404)
    }

    return address
}

export default getAddressesService