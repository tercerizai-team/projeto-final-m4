import { Router } from "express";
import { createCategoryController } from "../controllers/categories/createCategory.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const categoriesRoutes = Router()

categoriesRoutes.post("", authUserMiddleware, isAdmMiddleware, createCategoryController)

export default categoriesRoutes