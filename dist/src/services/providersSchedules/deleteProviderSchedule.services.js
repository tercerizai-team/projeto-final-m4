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
const data_source_1 = __importDefault(require("../../data-source"));
const dayHours_entity_1 = require("../../entities/dayHours.entity");
const provider_schedule_entity_1 = require("../../entities/provider_schedule.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const deleteProviderScheduleService = (providerScheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const providersSchedulesRepository = data_source_1.default.getRepository(provider_schedule_entity_1.ProviderSchedule);
    const dayHoursRepository = data_source_1.default.getRepository(dayHours_entity_1.DayHours);
    const providerScheduleExists = yield providersSchedulesRepository.count({
        where: { id: providerScheduleId },
    });
    if (!providerScheduleExists) {
        throw new AppError_1.default("Provider schedule not found", 404);
    }
    const providerSchedule = yield providersSchedulesRepository.findOneBy({
        id: providerScheduleId,
    });
    const dayHours = yield dayHoursRepository.findOneBy({
        id: providerSchedule.dayHours.id,
    });
    yield providersSchedulesRepository.delete({ id: providerSchedule.id });
    yield dayHoursRepository.delete({ id: dayHours.id });
});
exports.default = deleteProviderScheduleService;
