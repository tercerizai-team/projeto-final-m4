import { Router } from "express";
import { createScheduleController } from "../controllers/schedules/createSchedule.controller";
import { findScheduleController } from "../controllers/schedules/findSchedule.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post("", authUserMiddleware, createScheduleController);
scheduleRoutes.get("/:id", findScheduleController);

export default scheduleRoutes;
