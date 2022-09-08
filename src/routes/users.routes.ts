import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { getUserController } from "../controllers/users/getUser.controller";
import { listUsersController } from "../controllers/users/listUsers.controller";
import { softDeleteUserController } from "../controllers/users/softDeleteUser.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";

const usersRoutes = Router()

usersRoutes.post("", createUserController)
usersRoutes.get("", authUserMiddleware, isAdmMiddleware, listUsersController)
usersRoutes.get("/:id", authUserMiddleware, isAdmMiddleware, getUserController)
usersRoutes.delete("/:id", authUserMiddleware, isTheOwnerOrAdmMiddleware, softDeleteUserController)

export default usersRoutes