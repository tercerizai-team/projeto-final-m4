"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createAddresses_controller_1 = __importDefault(require("../controllers/addresses/createAddresses.controller"));
const updateAddress_controller_1 = __importDefault(require("../controllers/addresses/updateAddress.controller"));
const getAddresses_controler_1 = __importDefault(require("../controllers/addresses/getAddresses.controler"));
const authUser_middleware_1 = require("../middlewares/authUser.middleware");
const deleteAddress_controller_1 = require("../controllers/addresses/deleteAddress.controller");
const addressesRoutes = (0, express_1.Router)();
addressesRoutes.post("", authUser_middleware_1.authUserMiddleware, createAddresses_controller_1.default);
addressesRoutes.delete("/:id", authUser_middleware_1.authUserMiddleware, deleteAddress_controller_1.deleteAddressController);
addressesRoutes.get("", authUser_middleware_1.authUserMiddleware, getAddresses_controler_1.default);
addressesRoutes.patch("/:id", authUser_middleware_1.authUserMiddleware, updateAddress_controller_1.default);
exports.default = addressesRoutes;
