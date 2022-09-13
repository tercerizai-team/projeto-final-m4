import { Router } from "express";
import { createServiceController } from "../controllers/service/createService.controller";
import { deleteServiceController } from "../controllers/service/deleteService.controller";
import { updateServiceController } from "../controllers/service/updateService.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const servicesRoutes = Router();

servicesRoutes.post("", authUserMiddleware, createServiceController);
servicesRoutes.patch(
  "/:serviceId",
  authUserMiddleware,
  updateServiceController
);
servicesRoutes.delete(
  "/:serviceId",
  authUserMiddleware,
  deleteServiceController
);

export default servicesRoutes;
