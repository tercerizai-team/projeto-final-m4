import { Router } from "express";
import { listProvidersController } from "../controllers/providers/listProviders.controller";

const providerRoutes = Router();

providerRoutes.get('', listProvidersController)

export default providerRoutes;
