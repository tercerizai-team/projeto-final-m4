import { Router } from "express";
import { deleteProviderScheduleController } from "../controllers/providersSchedules/deleteProviderSchedule.controller";
import { createNewProviderScheduleController } from "../controllers/providersSchedules/providersSchedules.controllers";
import { updateProviderScheduleController } from "../controllers/providersSchedules/updateProviderSchedule.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware"
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";


const providerSchedulesRoutes = Router()


providerSchedulesRoutes.post("", authUserMiddleware, createNewProviderScheduleController)
providerSchedulesRoutes.delete("/:id", authUserMiddleware, isTheOwnerOrAdmMiddleware, deleteProviderScheduleController)
providerSchedulesRoutes.patch("/:id", authUserMiddleware, isTheOwnerOrAdmMiddleware, updateProviderScheduleController)


export default providerSchedulesRoutes