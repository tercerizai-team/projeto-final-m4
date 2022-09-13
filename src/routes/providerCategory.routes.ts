import { Router } from "express";
import { deleteProviderCategoryController } from "../controllers/categories/deleteCategoryProvider.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";

const providerCategoryRoutes = Router()

providerCategoryRoutes.delete("/categories/:id", authUserMiddleware, deleteProviderCategoryController)

export default providerCategoryRoutes