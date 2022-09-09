import { Router } from "express";
import { createScheduleController } from "../controllers/schedules/createSchedule.controller";
import { deleteScheduleController } from "../controllers/schedules/deleteSchedule.controller";
import { findScheduleController } from "../controllers/schedules/findSchedule.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post("", authUserMiddleware, createScheduleController);
scheduleRoutes.get("/:id", authUserMiddleware, findScheduleController);

scheduleRoutes.delete("/:id", authUserMiddleware, deleteScheduleController);

export default scheduleRoutes;
