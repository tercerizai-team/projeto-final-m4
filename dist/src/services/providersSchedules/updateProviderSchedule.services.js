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
const verifyDate_utility_1 = require("../../utils/verifyDate.utility");
const updateProviderScheduleService = ({ day, initHour, limitHour }, id) => __awaiter(void 0, void 0, void 0, function* () {
    const providersSchedulesRepository = data_source_1.default.getRepository(provider_schedule_entity_1.ProviderSchedule);
    const dayHoursRepository = data_source_1.default.getRepository(dayHours_entity_1.DayHours);
    const providerSchedule = yield providersSchedulesRepository.findOne({
        where: { id },
    });
    if (!providerSchedule) {
        throw new AppError_1.default("Provider schedule not found", 404);
    }
    if (!day) {
        day = providerSchedule.dayHours.day;
    }
    const dayHours = yield dayHoursRepository.findOneBy({
        id: providerSchedule.dayHours.id,
    });
    const allProvidersSchedules = yield providersSchedulesRepository.find({ relations: { provider: true } });
    const providerSchedulesByDay = allProvidersSchedules.filter(providerSched => providerSched.dayHours.day === providerSchedule.dayHours.day);
    const initDate = new Date();
    if (!initHour) {
        const dbInitHour = providerSchedule.dayHours.initHour.toString().split(":");
        initDate.setHours(parseInt(dbInitHour[0]));
        initDate.setMinutes(parseInt(dbInitHour[1]));
    }
    else {
        const splitedInitHour = initHour === null || initHour === void 0 ? void 0 : initHour.split(":");
        initDate.setHours(parseInt(splitedInitHour[0]));
        initDate.setMinutes(parseInt(splitedInitHour[1]));
    }
    const limitDate = new Date();
    if (!limitHour) {
        const dbLimitHour = providerSchedule.dayHours.limitHour.toString().split(":");
        limitDate.setHours(parseInt(dbLimitHour[0]));
        limitDate.setMinutes(parseInt(dbLimitHour[1]));
    }
    else {
        const splitedLimitHour = limitHour === null || limitHour === void 0 ? void 0 : limitHour.split(":");
        limitDate.setHours(parseInt(splitedLimitHour[0]));
        limitDate.setMinutes(parseInt(splitedLimitHour[1]));
    }
    if (providerSchedulesByDay.length < 2) {
        yield dayHoursRepository.update(dayHours.id, {
            day,
            initHour: initDate,
            limitHour: limitDate
        });
    }
    else {
        const updateIsValid = (0, verifyDate_utility_1.validateUpdateDayHours)(providerSchedulesByDay, initDate, limitDate, dayHours.id);
        if (updateIsValid) {
            yield dayHoursRepository.update(dayHours.id, {
                day,
                initHour: initDate,
                limitHour: limitDate
            });
        }
    }
});
exports.default = updateProviderScheduleService;
