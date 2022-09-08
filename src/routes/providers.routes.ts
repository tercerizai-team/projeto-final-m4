import { Router } from "express";
import { createProviderController } from "../controllers/providers/createProvider.controller";
import { providerMiddleware } from "../middlewares/provider.middleware";

const providersRouter = Router();

providersRouter.post("", providerMiddleware, createProviderController);

export default providersRouter;
