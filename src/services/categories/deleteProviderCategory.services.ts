import AppDataSource from "../../data-source"
import { CategoryProvider } from "../../entities/category_provider.entity"
import AppError from "../../errors/AppError"


export const deleteProviderCategoryService = async (providerId: string, id: string): Promise<void> => {

    const providerCategoryRepository = AppDataSource.getRepository(CategoryProvider)

    const allProviderCategories = await providerCategoryRepository.find({ where : {
        id: providerId
    }})

    if(!allProviderCategories){
        throw new AppError("invalid provider id", 404);
        
    }

    const pivotProviderCategory:any = allProviderCategories.find(providerCategory => providerCategory.category.id === id)

    if(!pivotProviderCategory){
        throw new AppError("invalid category id", 404);
        
    }

    providerCategoryRepository.delete(pivotProviderCategory?.id)

}