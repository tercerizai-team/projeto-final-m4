import { Router } from "express";
import { listProvidersController } from "../controllers/providers/listProviders.controller";
import { updateProviderController } from "../controllers/providers/updateProvider.controller";

const providerRoutes = Router();

providerRoutes.get('', listProvidersController)
providerRoutes.patch('/:id', updateProviderController)

export default providerRoutes;
