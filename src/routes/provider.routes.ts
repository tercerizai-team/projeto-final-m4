import { Router } from "express";
import { createProviderController } from "../controllers/providers/createProvider.controller";
import { deleteProviderController } from "../controllers/providers/deleteProvider.controller";
import { getProviderController } from "../controllers/providers/getProvider.controller";
import { listProvidersController } from "../controllers/providers/listProviders.controller";
import { updateProviderController } from "../controllers/providers/updateProvider.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";
import { providerMiddleware } from "../middlewares/provider.middleware";

const providerRoutes = Router();

providerRoutes.get('', listProvidersController)
providerRoutes.patch('/:id', authUserMiddleware, updateProviderController)
providerRoutes.delete('/:id', authUserMiddleware, deleteProviderController)
providerRoutes.post("", providerMiddleware, createProviderController);
providerRoutes.get("/:id", authUserMiddleware, isTheOwnerOrAdmMiddleware, getProviderController)

export default providerRoutes;
