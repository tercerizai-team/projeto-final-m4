export interface adress {
  state: string;
  city: string;
  zipCode: string;
  number: string;
  street: string;
  discrit: string;
  complement?: string;
}

export interface IProviderRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  isPremium: boolean;
  address: adress;
}
