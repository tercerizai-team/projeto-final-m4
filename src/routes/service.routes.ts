import { Router } from "express";
import { createServiceController } from "../controllers/service/createService.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const servicesRoutes = Router();

servicesRoutes.post("", authUserMiddleware, createServiceController);

export default servicesRoutes;
