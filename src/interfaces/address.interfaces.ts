export interface IAdressRequest {
    state: string
    city: string
    zipCode: string
    number: string
    street: string
    district: string
    complement?: string
}

export interface IAddressUpdate{
    state?: string
    street?: string
    district?: string
    number?: string
    complement?: string
    city?: string
    zipCode?: string
}
