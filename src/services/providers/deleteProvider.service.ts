import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";
import AppError from "../../errors/AppError";

export const deleteProviderService = async (
  id: string,
  isAdm: boolean,
  providerId: string
) => {
  const providerRepository = AppDataSource.getRepository(Providers);
  const provider = await providerRepository.findOneBy({ id });

  if (providerId !== id && !isAdm) {
    throw new AppError("Unauthorized access", 401);
  }

  if (!provider) {
    throw new AppError("User not Found", 404);
  }

  if (!provider.isActive) {
    throw new AppError("Inactive user");
  }

  await providerRepository.update(provider!.id, {
    isActive: false
  });
};
