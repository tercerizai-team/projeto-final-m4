import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

export const getCategoryService = async (id: string) => {
    const categoryRepository = AppDataSource.getRepository(Categories)
    const category = await categoryRepository.findOneBy({id: id})

    if (!category) {
        throw new AppError('Category not found', 404)
    }

    return category
}