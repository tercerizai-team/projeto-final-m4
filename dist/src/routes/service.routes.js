"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createService_controller_1 = require("../controllers/service/createService.controller");
const getServices_controller_1 = __importDefault(require("../controllers/service/getServices.controller"));
const deleteService_controller_1 = require("../controllers/service/deleteService.controller");
const updateService_controller_1 = require("../controllers/service/updateService.controller");
const authUser_middleware_1 = require("../middlewares/authUser.middleware");
const servicesRoutes = (0, express_1.Router)();
servicesRoutes.post("", authUser_middleware_1.authUserMiddleware, createService_controller_1.createServiceController);
servicesRoutes.get("", authUser_middleware_1.authUserMiddleware, getServices_controller_1.default);
servicesRoutes.patch("/:serviceId", authUser_middleware_1.authUserMiddleware, updateService_controller_1.updateServiceController);
servicesRoutes.delete("/:serviceId", authUser_middleware_1.authUserMiddleware, deleteService_controller_1.deleteServiceController);
exports.default = servicesRoutes;
