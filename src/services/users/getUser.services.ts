import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

export const getUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Users)
    const usersAddresses = await userRepository.find({relations: {addresses: true}})
    const userAddresses = await usersAddresses.filter(userAddress => userAddress.addresses.filter(address => address.id === id))

    if (!usersAddresses) {
        throw new AppError('User not found', 404)
    }

    return userAddresses
}