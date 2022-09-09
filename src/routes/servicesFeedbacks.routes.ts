import { Router } from "express";
import { createServiceFeedbackController } from "../controllers/servicesFeedbacks/createServiceFeedback.controller";
import { deleteServiceFeedbackController } from "../controllers/servicesFeedbacks/deleteServiceFeedback.controller";
import { listProviderFeedbacksController } from "../controllers/servicesFeedbacks/listProviderFeedbacks.controller";
import { updateServiceFeedbackController } from "../controllers/servicesFeedbacks/updateServiceFeedback.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const servicesFeedbacksRoutes = Router();

servicesFeedbacksRoutes.post("", authUserMiddleware, createServiceFeedbackController)
servicesFeedbacksRoutes.get("/:id", authUserMiddleware, listProviderFeedbacksController)
servicesFeedbacksRoutes.post("/:id", authUserMiddleware, isAdmMiddleware, updateServiceFeedbackController)
servicesFeedbacksRoutes.delete("/:id", authUserMiddleware, isAdmMiddleware, deleteServiceFeedbackController)

export default servicesFeedbacksRoutes;
