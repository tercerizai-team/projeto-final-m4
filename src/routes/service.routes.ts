import { Router } from "express";
import { createServiceController } from "../controllers/service/createService.controller";
import getServicesController from "../controllers/service/getServices.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const servicesRoutes = Router();

servicesRoutes.post("", authUserMiddleware, createServiceController);
servicesRoutes.get("", authUserMiddleware,getServicesController);

export default servicesRoutes;
