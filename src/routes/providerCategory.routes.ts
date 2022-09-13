import { Router } from "express";
import { deleteProviderCategoryController } from "../controllers/providerCategory/deleteCategoryProvider.controller";
import { registerProviderCategoryController } from "../controllers/providerCategory/registerProviderCategory.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const providerCategoryRoutes = Router()

providerCategoryRoutes.post("/categories", authUserMiddleware, registerProviderCategoryController)
providerCategoryRoutes.delete("/categories/:id", authUserMiddleware, deleteProviderCategoryController)

export default providerCategoryRoutes