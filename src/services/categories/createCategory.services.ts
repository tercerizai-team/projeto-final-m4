import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories.interfaces";

export const createCategoryService = async ({name}: ICategoryRequest) => {
    const categoryRepository = AppDataSource.getRepository(Categories)
    const categories = await categoryRepository.find()
    const categoryAlreadyExists = categories.find(category => category.name === name)

    if (categoryAlreadyExists) {
        throw new AppError('Category already exists', 400)
    }

    if (!name) {
        throw new AppError('Missing name value', 404)
    }

    const category = new Categories()
    category.name = name

    categoryRepository.create(category)
    await categoryRepository.save(category)

    return category
}