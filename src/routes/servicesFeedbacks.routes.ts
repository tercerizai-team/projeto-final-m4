import { Router } from "express";
import { createServiceFeedbackController } from "../controllers/servicesFeedbacks/createServiceFeedback.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const servicesFeedbacksRoutes = Router();

servicesFeedbacksRoutes.post("", authUserMiddleware, createServiceFeedbackController)

export default servicesFeedbacksRoutes;
