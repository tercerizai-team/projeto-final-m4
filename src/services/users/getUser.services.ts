import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";

export const getUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Users)
    const user = userRepository.findOneBy({id: id})

    return user
}