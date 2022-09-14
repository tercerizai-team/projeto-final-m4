"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServiceController = void 0;
const updateService_service_1 = require("../../services/service/updateService.service");
const updateServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const isAdm = req.userIsAdm;
    const serviceId = req.params.serviceId;
    const { isServiceFinished, isServiceCanceled, clientFinished, providerFinished, } = req.body;
    const updateService = yield (0, updateService_service_1.updateServiceService)({ isServiceFinished, isServiceCanceled, clientFinished, providerFinished }, serviceId, userId, isAdm);
    return res.status(200).json(updateService);
});
exports.updateServiceController = updateServiceController;
