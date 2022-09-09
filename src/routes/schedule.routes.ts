import { Router } from "express";
import { createScheduleController } from "../controllers/schedules/createSchedule.controller";
import updateScheduleController from "../controllers/schedules/updateSchedule.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post("", authUserMiddleware, createScheduleController);
scheduleRoutes.patch("/:id", authUserMiddleware, updateScheduleController)

export default scheduleRoutes;
