import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import AppError from "../../errors/AppError";
import { IUserEdit } from "../../interfaces/users.interfaces";
import bcrypt from "bcryptjs"




export const editUserService = async ({name, email, password, phone}: IUserEdit, isAdm: boolean, id: string, userId: string) => {


    const userRepository = AppDataSource.getRepository(Users)

    if (userId !== id && isAdm === false){
        throw new AppError("You are not allowed", 400)
    }

    const account = await userRepository.findOneBy({id})

    if (!account){
        throw new AppError('User not found', 404)
    }
    if (phone){
        if (phone?.length !== 11){
            throw new AppError('Phone must have eleven numbers', 400)
        }
    }

    let hashedPassword = password

    if (password){
        hashedPassword = await bcrypt.hash(password, 10)
    }

    const newDataUser = {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        updatedAt: new Date()
    }

    await userRepository.update({id}, newDataUser)

    const userUpdated = await userRepository.findOneBy({id})

    const returnUser = {
        email: userUpdated?.email,
        name: userUpdated?.name,
        phone: userUpdated?.phone,
        createdAt: userUpdated?.createdAt,
        updatedAt: userUpdated?.updatedAt
    }
    
    Object.defineProperty(userUpdated, 'password', {
        enumerable: false,
        writable: true
    })

    return returnUser

       

}