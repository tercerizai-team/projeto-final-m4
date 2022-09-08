import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";
import AppError from "../../errors/AppError";

export const getProviderService = async (id: string) => {
    const providerRepository = AppDataSource.getRepository(Providers)
    const provider = await providerRepository.findOneBy({id: id})

    if (!provider) {
        throw new AppError('Provider not found', 404)
    }

    return provider
}