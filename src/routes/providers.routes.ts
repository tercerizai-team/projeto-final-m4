import { Router } from "express";
import { getProviderController } from "../controllers/providers/getProvider.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";

const providersRoutes = Router()

providersRoutes.get("/:id", authUserMiddleware, isTheOwnerOrAdmMiddleware, getProviderController)

export default providersRoutes