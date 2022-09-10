import { Users } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";
import { Providers } from "../../entities/providers.entity";
import { IProviderRequest } from "../../interfaces/providers.interface";
import { Addresses } from "../../entities/addresses.entity";
import { IAdressRequest } from "../../interfaces/address.interfaces";

export const createProviderService = async ({
  name,
  email,
  password,
  phone,
  address,
}: IProviderRequest) => {
  const providersRepository = AppDataSource.getRepository(Providers);
  const addressRepository = AppDataSource.getRepository(Addresses);

  const verifyEmail = await providersRepository.findOneBy({ email: email });

  if (verifyEmail) {
    throw new AppError("User already exists", 400);
  }

  const {
    state,
    street,
    district,
    number,
    complement,
    city,
    zipCode,
  }: IAdressRequest = address;

  const addressAlreadyExists = await addressRepository.findOne({
    where: {
      street: address.street,
      number: address.number,
      complement: address.complement,
    },
  });

  if (addressAlreadyExists) {
    throw new AppError("Address already exists", 400);
  }

  const newAddress = new Addresses();
  newAddress.zipCode = zipCode;
  newAddress.city = city;
  newAddress.complement = complement!;
  newAddress.number = number;
  newAddress.district = district;
  newAddress.street = street;
  newAddress.state = state;

  await addressRepository.save(newAddress);

  const newProvider = new Providers();
  newProvider.name = name;
  newProvider.email = email;
  newProvider.password = await hash(password, 10);
  newProvider.phone = phone;
  newProvider.isPremium = false;
  newProvider.isActive = true;
  newProvider.address = newAddress;

  providersRepository.create(newProvider);
  await providersRepository.save(newProvider);

  return newProvider;
};
