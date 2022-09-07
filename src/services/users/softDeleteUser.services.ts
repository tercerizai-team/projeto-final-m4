import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import AppError from "../../errors/AppError";

export const softDeleteUserService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()
    const user = users.find(user => user.id === id)

    if (!user) {
        throw new AppError('User not found', 404)
    }

    if (user.isActive === false) {
        throw new AppError('User is been already deactivated', 400)
    }

    user.isActive = false
    await userRepository.save(user)

    const response = {message: "User deactivated", user}

    return response
}