import { Router } from "express";
import { deleteCategoryController } from "../controllers/categories/deleteCategory.controller";
import { createProviderController } from "../controllers/providers/createProvider.controller";
import { deleteProviderController } from "../controllers/providers/deleteProvider.controller";
import { getProviderController } from "../controllers/providers/getProvider.controller";
import { listProvidersController } from "../controllers/providers/listProviders.controller";
import { updateProviderController } from "../controllers/providers/updateProvider.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";
import { validationMiddleware } from "../middlewares/validationProvider.middleware";
import { providerSchema } from "../schemas";

const providerRoutes = Router();

providerRoutes.get("", listProvidersController);
providerRoutes.patch("/:id", authUserMiddleware, updateProviderController);
providerRoutes.delete("/:id", authUserMiddleware, deleteProviderController);
providerRoutes.post(
  "",
  validationMiddleware(providerSchema),
  createProviderController
);
providerRoutes.get(
  "/:id",
  authUserMiddleware,
  isTheOwnerOrAdmMiddleware,
  getProviderController
);

export default providerRoutes;
