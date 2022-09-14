import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity";
import { CategoryProvider } from "../../entities/category_provider.entity"
import { Providers } from "../../entities/providers.entity";
import AppError from "../../errors/AppError"


export const deleteProviderCategoryService = async (providerId: string, id: string): Promise<void> => {

    const providerCategoryRepository =
    AppDataSource.getRepository(CategoryProvider);
  const providersRepository = AppDataSource.getRepository(Providers);
  const categoryRepository = AppDataSource.getRepository(Categories);

  const provider = await providersRepository.findOneBy({ id: providerId });

  if (!provider) {
    throw new AppError("User not provider");
  }

  const category = await categoryRepository.findOneBy({ id });

  if (!category) {
    throw new AppError("Invalid category", 404);
  }

  const categoryProvider = await providerCategoryRepository.findOne({
    where: {category: {id: category.id}, provider: {id: provider.id}},
  });

  if(!categoryProvider) {
    throw new AppError("Category does not belong to the user")
  }

   await providerCategoryRepository.delete(categoryProvider.id)

}