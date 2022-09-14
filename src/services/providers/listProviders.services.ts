import AppDataSource from "../../data-source";
import { Providers } from "../../entities/providers.entity";

export const listProvidersService = async () => {

    const providerRepository = AppDataSource.getRepository(Providers)
    const providers: any = await providerRepository.find()

    providers.forEach((provider: any) => {
        delete provider.address
        delete provider.schedules
        delete provider.providerSchedule
    })

    return providers
}
