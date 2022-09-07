import { IAdressRequest } from "./address.interfaces"

export interface IUserRequest {
    name: string
    email: string
    password: string
    phone: string
    isAdm: boolean
    // address: IAdressRequest
}

export interface IUserLogin {
    email: string
    password: string
}