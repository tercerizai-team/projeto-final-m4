import { Request, Response } from "express";
import { deleteCategoryService } from "../../services/categories/deleteCategory.services";

export const deleteCategoryController = async (req: Request, res: Response) => {
    const id = req.params.id
    const category = await deleteCategoryService(id)
    return res.status(200).json({message: "Category deleted"})
}