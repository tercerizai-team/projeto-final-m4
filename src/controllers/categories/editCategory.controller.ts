import { Request, Response } from "express";
import { editCategoryService } from "../../services/categories/editCategory.services";

export const editCategoryController = async (req: Request, res: Response) => {
    const id = req.params.id
    const { name } = req.body

    const category = await editCategoryService(id, name)

    return res.status(200).json({message: "Category updated"})
}