import AppDataSource from "../../data-source"
import { CategoryProvider } from "../../entities/category_provider.entity"
import AppError from "../../errors/AppError"


export const deleteProviderCategoryService = async (providerId: string, id: string): Promise<void> => {

    const providerCategoryRepository = AppDataSource.getRepository(CategoryProvider)

    const allProviderCategories = await providerCategoryRepository.find({relations: {provider: true}})

    const categoryToDelete:any = allProviderCategories.find(provCategory => provCategory.provider.id === providerId && provCategory.category.id === id)

    if(!allProviderCategories){
        throw new AppError("invalid provider id or category id", 404);
    }

    await providerCategoryRepository.delete(categoryToDelete?.id)

}