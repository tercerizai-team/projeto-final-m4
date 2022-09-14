"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createSchedule_controller_1 = require("../controllers/schedules/createSchedule.controller");
const updateSchedule_controller_1 = __importDefault(require("../controllers/schedules/updateSchedule.controller"));
const deleteSchedule_controller_1 = require("../controllers/schedules/deleteSchedule.controller");
const findSchedule_controller_1 = require("../controllers/schedules/findSchedule.controller");
const authUser_middleware_1 = require("../middlewares/authUser.middleware");
const scheduleRoutes = (0, express_1.Router)();
scheduleRoutes.post("", authUser_middleware_1.authUserMiddleware, createSchedule_controller_1.createScheduleController);
scheduleRoutes.patch("/:id", authUser_middleware_1.authUserMiddleware, updateSchedule_controller_1.default);
scheduleRoutes.get("/:id", authUser_middleware_1.authUserMiddleware, findSchedule_controller_1.findScheduleController);
scheduleRoutes.delete("/:id", authUser_middleware_1.authUserMiddleware, deleteSchedule_controller_1.deleteScheduleController);
exports.default = scheduleRoutes;
