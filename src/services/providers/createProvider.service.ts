import { Users } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";
import { Providers } from "../../entities/providers.entity";
import { IProviderRequest } from "../../interfaces/providers.interface";
import { Addresses } from "../../entities/addresses.entity";

export const createProviderService = async ({
  name,
  email,
  password,
  phone,
  isPremium,
  address,
}: IProviderRequest) => {
  const providersRepository = AppDataSource.getRepository(Providers);
  const addressRepository = AppDataSource.getRepository(Addresses);

  const providerAlreadyExists = await providersRepository.findOne({
    where: { email: email },
  });

  const userAddress = await addressRepository.findOne({
    where: { zipCode: address.zipCode },
  });

  if (providerAlreadyExists) {
    throw new AppError("Usuário já cadastrado", 400);
  }

  const newProvider = new Providers();
  newProvider.name = name;
  newProvider.email = email;
  newProvider.password = await hash(password, 10);
  newProvider.phone = phone;
  newProvider.isPremium = isPremium;
  newProvider.isActive = true;
  newProvider.address = userAddress!;

  providersRepository.create(newProvider);
  await providersRepository.save(newProvider);

  return newProvider;
};
