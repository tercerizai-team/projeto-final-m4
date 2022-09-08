import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

export const listCategoriesService = async () => {
    const categoryRepository = AppDataSource.getRepository(Categories)
    const categories = await categoryRepository.find()
    return categories
}