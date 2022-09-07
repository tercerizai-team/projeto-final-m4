export interface IAdressRequest {
    state: string
    city: string
    cep: number
    number: string
    street: string
    discrit: string
    complement?: string
}