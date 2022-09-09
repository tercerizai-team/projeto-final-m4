import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

export const editCategoryService = async (id: string, newName: string) => {
    const categoryRepository = AppDataSource.getRepository(Categories)
    const categories = await categoryRepository.find()

    const category = categories.find(category => category.id === id)

    const categoryAlreadyExists = categories.find(category => {
        if (category.name === newName && category.id !== id) {
            return true
        }
    })

    if (categoryAlreadyExists) {
        throw new AppError('Category name already exists', 400)
    }

    if (!category) {
        throw new AppError('Category not found', 404)
    }

    if (!newName) {
        throw new AppError('Missing name value', 400)
    }

    if (category.name === newName) {
        throw new AppError('Choose another category name')
    }

    await categoryRepository.update(category!.id, {name: newName})

    return true
}