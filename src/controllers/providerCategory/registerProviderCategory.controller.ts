import { Request, Response } from "express";
import { registerProviderCategoryService } from "../../services/providerCategory/registerProviderCategory.services";


export const registerProviderCategoryController = async (req: Request, res: Response) => {

    const providerId = req.userId
    const categoryId = req.body.categoryId

    const newProviderCategory = await registerProviderCategoryService(categoryId, providerId)

    return res.status(201).json(newProviderCategory)

}