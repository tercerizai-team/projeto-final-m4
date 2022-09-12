import { Router } from "express";
import { deleteProviderScheduleController } from "../controllers/providersSchedules/deleteProviderSchedule.controller";
import { createNewProviderScheduleController } from "../controllers/providersSchedules/providersSchedules.controllers";
import { authUserMiddleware } from "../middlewares/authUser.middleware"


const providerSchedulesRoutes = Router()


providerSchedulesRoutes.post("", authUserMiddleware, createNewProviderScheduleController)
providerSchedulesRoutes.delete("/:id", authUserMiddleware, deleteProviderScheduleController)


export default providerSchedulesRoutes