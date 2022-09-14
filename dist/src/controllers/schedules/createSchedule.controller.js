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
exports.createScheduleController = void 0;
const createSchedule_service_1 = require("../../services/schedule/createSchedule.service");
const createScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSchedule = yield (0, createSchedule_service_1.createScheduleService)(req.body, req);
    return res.status(201).json(newSchedule);
});
exports.createScheduleController = createScheduleController;
