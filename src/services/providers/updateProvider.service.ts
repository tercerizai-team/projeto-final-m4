import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";
import AppError from "../../errors/AppError";
import { IProviderRequest } from "../../interfaces/providers.interfaces";

export const updateProviderService = async (
  providerData: IProviderRequest,
  id: string,
  isAdm: boolean,
  providerId: string
) => {
  const providerRepository = AppDataSource.getRepository(Providers);
  const provider = await providerRepository.findOneBy({ id });

  if(providerId !== id || !isAdm) {
    throw new AppError('Unauthorized access', 401)
  }

  if (!provider) {
    throw new AppError("User not Found", 404);
  }

  const providers = await providerRepository.find();

  if (
    providerData.email
      ? providers.some(
          (provider) =>
            provider.email === providerData.email && provider.id !== id
        )
      : false
  ) {
    throw new Error("Email is already in use");
  }

  await providerRepository.update(provider!.id, {
    email: providerData.email,
    name: providerData.name,
    phone: providerData.phone,
    password: providerData.password
      ? await hash(providerData.password, 10)
      : provider.password,
    isPremium: providerData.isPremium,
  });

  const newProvider = providerRepository.findOneBy({ id });
  return newProvider;
};
