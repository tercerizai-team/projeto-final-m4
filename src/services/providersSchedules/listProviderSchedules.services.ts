import AppDataSource from "../../data-source"
import { Providers } from "../../entities/providers.entity"


export const listAllProviderSchedulesService = async (userId: string, isAdm: boolean) => {

    const providersRepository = AppDataSource.getRepository(Providers)

    if(isAdm){

        const providersSchedules = await providersRepository.find(
            {
                relations: {providerSchedule: true}
            }
        )

        return providersSchedules

    }

    const allProviderSchedules = await providersRepository.find()

    const providerSchedules = allProviderSchedules.find(provider => provider.id === userId)

    return providerSchedules
    
}

export const listProviderSchedulesService = async (userId: string) => {

    const providersRepository = AppDataSource.getRepository(Providers)

    const providersSchedules = await providersRepository.find(
        {
            relations: {providerSchedule: true}
        }
    )

    return providersSchedules

}