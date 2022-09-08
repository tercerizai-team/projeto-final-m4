import { Router } from "express";
import { createUserFeedbackController } from "../controllers/usersFeedbacks/createUserFeedback.controller";
import { listUserFeedbacksController } from "../controllers/usersFeedbacks/listUserFeedbacks.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const usersFeedbacksRoutes = Router();

usersFeedbacksRoutes.post('', authUserMiddleware, createUserFeedbackController)
usersFeedbacksRoutes.get('/:id', authUserMiddleware, listUserFeedbacksController)

export default usersFeedbacksRoutes;
