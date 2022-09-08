import { Router } from "express";
import { createUserFeedbackController } from "../controllers/usersFeedbacks/createUserFeedback.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const usersFeedbacksRoutes = Router();

usersFeedbacksRoutes.post('', authUserMiddleware, createUserFeedbackController)

export default usersFeedbacksRoutes;
