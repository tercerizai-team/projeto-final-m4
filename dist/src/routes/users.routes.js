"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUser_controller_1 = require("../controllers/users/createUser.controller");
const editUser_controller_1 = require("../controllers/users/editUser.controller");
const getUser_controller_1 = require("../controllers/users/getUser.controller");
const listUsers_controller_1 = require("../controllers/users/listUsers.controller");
const softDeleteUser_controller_1 = require("../controllers/users/softDeleteUser.controller");
const authUser_middleware_1 = require("../middlewares/authUser.middleware");
const isAdm_middleware_1 = require("../middlewares/isAdm.middleware");
const isTheOwnerOrAdm_middleware_1 = require("../middlewares/isTheOwnerOrAdm.middleware");
const usersRoutes = (0, express_1.Router)();
usersRoutes.post("", createUser_controller_1.createUserController);
usersRoutes.get("", authUser_middleware_1.authUserMiddleware, isAdm_middleware_1.isAdmMiddleware, listUsers_controller_1.listUsersController);
usersRoutes.patch("/:id", authUser_middleware_1.authUserMiddleware, editUser_controller_1.editUserController);
usersRoutes.get("/:id", authUser_middleware_1.authUserMiddleware, isTheOwnerOrAdm_middleware_1.isTheOwnerOrAdmMiddleware, getUser_controller_1.getUserController);
usersRoutes.delete("/:id", authUser_middleware_1.authUserMiddleware, isTheOwnerOrAdm_middleware_1.isTheOwnerOrAdmMiddleware, softDeleteUser_controller_1.softDeleteUserController);
exports.default = usersRoutes;