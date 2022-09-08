import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

export const deleteCategoryService = async (id: string) => {
    const categoryRepository = AppDataSource.getRepository(Categories)
    const categories = await categoryRepository.find()

    const category = categories.find(category => category.id === id)

    if (!category) {
        throw new AppError('Category not found', 404)
    }

    await categoryRepository.delete(category!.id)

    return true
}