"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginUser_controller_1 = require("../controllers/users/loginUser.controller");
const sessionRoutes = (0, express_1.Router)();
sessionRoutes.post("", loginUser_controller_1.loginUserController);
exports.default = sessionRoutes;
