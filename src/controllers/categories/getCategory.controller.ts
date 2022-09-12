import { Request, Response } from "express";
import { getCategoryService } from "../../services/categories/getCategory.services";

export const getCategoryController = async (req: Request, res: Response) => {
    const id = req.params.id
    const category = await getCategoryService(id)
    return res.status(200).json(category)
}