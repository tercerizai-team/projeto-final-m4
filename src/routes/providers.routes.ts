import { Router } from "express";
import { createProviderController } from "../controllers/providers/createProvider.controller";
import { providerMiddleware } from "../middlewares/provider.middleware";
import { getProviderController } from "../controllers/providers/getProvider.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";


const providersRoutes = Router();

providersRoutes.post("", providerMiddleware, createProviderController);
providersRoutes.get("/:id", authUserMiddleware, isTheOwnerOrAdmMiddleware, getProviderController)

export default providersRoutes;
