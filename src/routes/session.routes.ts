import { Router } from "express";
import { loginUserController } from "../controllers/users/loginUser.controller";

const sessionRoutes = Router()

sessionRoutes.post("", loginUserController)

export default sessionRoutes