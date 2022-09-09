import { Router } from "express";
import { createScheduleController } from "../controllers/schedules/createSchedule.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const scheduleRoutes = Router();

scheduleRoutes.post("", authUserMiddleware, createScheduleController);

export default scheduleRoutes;
