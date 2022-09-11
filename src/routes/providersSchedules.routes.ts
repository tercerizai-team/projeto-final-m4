import { Router } from "express";
import { createNewProviderScheduleController } from "../controllers/providersSchedules/providersSchedules.controllers";
import { authUserMiddleware } from "../middlewares/authUser.middleware"


const providerSchedulesRoutes = Router()


providerSchedulesRoutes.post("", authUserMiddleware, createNewProviderScheduleController)


export default providerSchedulesRoutes