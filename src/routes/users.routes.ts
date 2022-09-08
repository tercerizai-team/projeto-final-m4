import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { listUsersController } from "../controllers/users/listUser.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

const usersRoutes = Router()

usersRoutes.post("", createUserController)
usersRoutes.get("", authUserMiddleware, isAdmMiddleware, listUsersController)

export default usersRoutes