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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProviderScheduleController = void 0;
const updateProviderSchedule_services_1 = __importDefault(require("../../services/providersSchedules/updateProviderSchedule.services"));
const updateProviderScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dayHourData = req.body;
    yield (0, updateProviderSchedule_services_1.default)(dayHourData, id);
    return res.json({ message: "Day hours updated" });
});
exports.updateProviderScheduleController = updateProviderScheduleController;
