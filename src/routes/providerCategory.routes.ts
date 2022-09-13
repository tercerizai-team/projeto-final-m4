import { Router } from "express";
import { deleteProviderCategoryController } from "../controllers/categories/deleteCategoryProvider.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const providerCategoryRoutes = Router()

providerCategoryRoutes.delete("/categories/:id", authUserMiddleware, deleteProviderCategoryController)

export default providerCategoryRoutes