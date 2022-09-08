import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

export const getUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Users)
    const user = await userRepository.findOneBy({id: id})

    if (!user) {
        throw new AppError('User not found', 404)
    }

    return user
}