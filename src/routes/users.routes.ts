import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { loginUserController } from "../controllers/users/loginUser.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const usersRoutes = Router()

usersRoutes.post("", createUserController)

export default usersRoutes