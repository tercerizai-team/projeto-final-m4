import { Request, Response } from "express";
import { deleteProviderCategoryService } from "../../services/categories/deleteProviderCategory.services";


export const deleteProviderCategoryController = async (req: Request, res: Response) => {

    const providerId = req.userId
    const { id } = req.params

    await deleteProviderCategoryService(providerId, id)

    return res.json({message: "Category removed!"})

}