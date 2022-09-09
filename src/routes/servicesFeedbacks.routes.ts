import { Router } from "express";
import { createServiceFeedbackController } from "../controllers/servicesFeedbacks/createServiceFeedback.controller";
import { listProviderFeedbacksController } from "../controllers/servicesFeedbacks/listProviderFeedbacks.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const servicesFeedbacksRoutes = Router();

servicesFeedbacksRoutes.post("", authUserMiddleware, createServiceFeedbackController)
servicesFeedbacksRoutes.get("/:id", authUserMiddleware, listProviderFeedbacksController)

export default servicesFeedbacksRoutes;
