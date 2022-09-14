export interface adress {
  state: string;
  city: string;
  zipCode: string;
  number: string;
  street: string;
  district: string;
  complement?: string;
}

export interface IProviderRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: adress;
}

export interface IProviderRequestYup {
  name: string;
  email: string;
  password: string;
  phone: string;
}
