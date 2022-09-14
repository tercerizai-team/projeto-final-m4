import { Router } from "express";
import { deleteProviderScheduleController } from "../controllers/providersSchedules/deleteProviderSchedule.controller";
import { listAllProviderSchedulesController } from "../controllers/providersSchedules/listProviderSchedule.controller";
import { createNewProviderScheduleController } from "../controllers/providersSchedules/providersSchedules.controllers";
import { updateProviderScheduleController } from "../controllers/providersSchedules/updateProviderSchedule.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware"

const providerSchedulesRoutes = Router()

providerSchedulesRoutes.post("", authUserMiddleware, createNewProviderScheduleController)
providerSchedulesRoutes.delete("/:id", authUserMiddleware, deleteProviderScheduleController)
providerSchedulesRoutes.patch("/:id", authUserMiddleware, updateProviderScheduleController)
providerSchedulesRoutes.get("", authUserMiddleware, listAllProviderSchedulesController)

export default providerSchedulesRoutes