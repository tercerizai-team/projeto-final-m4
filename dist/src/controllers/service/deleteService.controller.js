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
exports.deleteServiceController = void 0;
const deleteService_1 = require("../../services/service/deleteService");
const deleteServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const isAdm = req.userIsAdm;
    const serviceId = req.params.serviceId;
    yield (0, deleteService_1.deleteServiceService)(serviceId, userId, isAdm);
    return res.status(200).send();
});
exports.deleteServiceController = deleteServiceController;
