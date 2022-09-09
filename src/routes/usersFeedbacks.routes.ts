import { Router } from "express";
import { createUserFeedbackController } from "../controllers/usersFeedbacks/createUserFeedback.controller";
import { listUserFeedbacksController } from "../controllers/usersFeedbacks/listUserFeedbacks.controller";
import { updateUserFeedbackController } from "../controllers/usersFeedbacks/updateUserFeedback.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const usersFeedbacksRoutes = Router();

usersFeedbacksRoutes.post('', authUserMiddleware, createUserFeedbackController)
usersFeedbacksRoutes.get('/:id', authUserMiddleware, listUserFeedbacksController)
usersFeedbacksRoutes.patch('/:id', authUserMiddleware, isAdmMiddleware, updateUserFeedbackController)

export default usersFeedbacksRoutes;
