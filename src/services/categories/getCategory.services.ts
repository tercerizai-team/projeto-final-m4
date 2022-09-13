import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { Providers } from "../../entities/providers.entity";
import AppError from "../../errors/AppError";

export const getCategoryService = async (id: string) => {
    const categoryRepository = AppDataSource.getRepository(Categories)
    const providersRepository = AppDataSource.getRepository(Providers)
    const category = await categoryRepository.findOne({where: {id: id}, relations:{categoryProviders:true}})

    if (!category) {
        throw new AppError('Category not found', 404)
    }

    const providers = providersRepository.find({where: {providerCategories: {category: category}}})

    return providers
}