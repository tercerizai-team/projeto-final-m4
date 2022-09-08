import { Router } from "express";
import { deleteProviderController } from "../controllers/providers/deleteProvider.controller";
import { listProvidersController } from "../controllers/providers/listProviders.controller";
import { updateProviderController } from "../controllers/providers/updateProvider.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const providerRoutes = Router();

providerRoutes.get('', listProvidersController)
providerRoutes.patch('/:id', authUserMiddleware, updateProviderController)
providerRoutes.delete('/:id', authUserMiddleware, deleteProviderController)

export default providerRoutes;
