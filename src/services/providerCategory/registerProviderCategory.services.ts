import { v4 as uuid } from "uuid"
import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { CategoryProvider } from "../../entities/category_provider.entity";
import { Providers } from "../../entities/providers.entity";
import AppError from "../../errors/AppError";


export const registerProviderCategoryService = async (categoryId: string, providerId: string) => {

    if(!categoryId || !providerId){
        throw new AppError("categoria não encontrada", 404);
    }

    const providerCategoriesRepository = AppDataSource.getRepository(CategoryProvider)
    const providersRepository = AppDataSource.getRepository(Providers)
    const categoriesRepository = AppDataSource.getRepository(Categories)

    const providerCategories = await providerCategoriesRepository.find({relations: {provider: true}})
    const providers = await providersRepository.find()
    const categories = await categoriesRepository.find()

    const providerCategoryAlreadyExists = providerCategories.find(providerCategory => providerCategory.category.id === categoryId && providerCategory.provider.id === providerId)

    if(providerCategoryAlreadyExists){
        throw new AppError("esse usuário já possui esta categoria em sua lista");
    }

    const provider: any = providers.find(prov => prov.id === providerId)
    const category: any = categories.find(cat => cat.id === categoryId)

    if(!category){
        throw new AppError("categoria não encontrada", 404);
    }

    const newProviderCategory: CategoryProvider = {
        id: uuid(),
        category,
        provider
    }

    await providerCategoriesRepository.save(newProviderCategory)

    const providerUser = providersRepository.findOneBy({id: provider.id})

    return providerUser
    
}