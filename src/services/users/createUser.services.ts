import { Users } from "../../entities/users.entity";
import { IUserRequest } from "../../interfaces/users.interfaces"
import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";

export const createUserService = async ({name, email, password, phone, isAdm}: IUserRequest) => {
    const userRepository = AppDataSource.getRepository(Users)
    const users = await userRepository.find()
    const emailAlreadyExists = users.find(user => user.email === email)

    if (emailAlreadyExists) {
        throw new AppError(400, 'Email already being used')
    }

    const createdAt = new Date()
    const updatedAt = new Date()

    const user = new Users()
    user.name = name
    user.email = email
    user.password = await hash(password, 10)
    user.createdAt = createdAt
    user.updatedAt = updatedAt
    user.isActive = true
    user.phone = phone
    user.isAdm = isAdm

    userRepository.create(user)
    await userRepository.save(user)

    return user
}