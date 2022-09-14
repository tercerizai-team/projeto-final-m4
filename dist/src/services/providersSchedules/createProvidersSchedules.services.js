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
exports.createNewProviderScheduleService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const dayHours_entity_1 = require("../../entities/dayHours.entity");
const providers_entity_1 = require("../../entities/providers.entity");
const provider_schedule_entity_1 = require("../../entities/provider_schedule.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const uuid_1 = require("uuid");
const verifyDate_utility_1 = require("../../utils/verifyDate.utility");
const createNewProviderScheduleService = ({ day, initHour, limitHour }, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!day || !initHour || !limitHour) {
        throw new AppError_1.default("missing register info");
    }
    const hoursRepository = data_source_1.default.getRepository(dayHours_entity_1.DayHours);
    const providerSchedulesRepository = data_source_1.default.getRepository(provider_schedule_entity_1.ProviderSchedule);
    const providersRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const providers = yield providersRepository.find();
    const allProviderSchedules = yield providerSchedulesRepository.find({ relations: { provider: true } });
    const validateUserId = providers.find(provider => provider.id === userId);
    if (!validateUserId) {
        throw new AppError_1.default("provider not found", 404);
    }
    const validateDaysHours = allProviderSchedules.filter((provSchedules) => {
        return provSchedules.dayHours.day === day && provSchedules.provider.id === userId;
    });
    const splitedInitHour = initHour.split(":");
    const initDateNow = new Date();
    initDateNow.setHours(parseInt(splitedInitHour[0]));
    initDateNow.setMinutes(parseInt(splitedInitHour[1]));
    const splitedLimitHour = limitHour.split(":");
    const limitDateNow = new Date();
    limitDateNow.setHours(parseInt(splitedLimitHour[0]));
    limitDateNow.setMinutes(parseInt(splitedLimitHour[1]));
    let hourIsValid = false;
    let dayIsValid = true;
    validateDaysHours.forEach(scheduleDay => {
        const validateHours = (0, verifyDate_utility_1.verifyHours)(initDateNow, scheduleDay.dayHours.initHour.toString(), limitDateNow, scheduleDay.dayHours.limitHour.toString());
        if (scheduleDay.dayHours.day === day) {
            dayIsValid = false;
        }
        if (validateHours) {
            hourIsValid = true;
        }
    });
    if (!hourIsValid && !dayIsValid) {
        throw new AppError_1.default("horário inválido, verifique sua requisição");
    }
    const newDayHour = {
        id: (0, uuid_1.v4)(),
        day,
        initHour: initDateNow,
        limitHour: limitDateNow
    };
    yield hoursRepository.save(newDayHour);
    const newProviderSchedule = {
        id: (0, uuid_1.v4)(),
        dayHours: newDayHour,
        provider: validateUserId
    };
    yield providerSchedulesRepository.save(newProviderSchedule);
    return newProviderSchedule;
});
exports.createNewProviderScheduleService = createNewProviderScheduleService;
