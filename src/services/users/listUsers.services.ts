import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";

export const listUsersService = async () => {
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()

    return users
}