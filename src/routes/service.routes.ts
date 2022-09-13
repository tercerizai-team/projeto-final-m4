import { Router } from "express";
import { createServiceController } from "../controllers/service/createService.controller";

const servicesRoutes = Router();

servicesRoutes.post("", createServiceController);

export default servicesRoutes;
