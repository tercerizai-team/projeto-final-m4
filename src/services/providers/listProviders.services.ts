import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";

export const listProvidersService = async () => {

    const providerRepository = AppDataSource.getRepository(Providers)
    const providers: any = await providerRepository.find()

    return providers
}
