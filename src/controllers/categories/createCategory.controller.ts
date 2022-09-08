import { Request, Response } from "express";
import { createCategoryService } from "../../services/categories/createCategory.services";

export const createCategoryController = async (req: Request, res: Response) => {
    const {name} = req.body
    const category = await createCategoryService({name})
    return res.status(201).json(category)
}