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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const schedules_entity_1 = require("../../entities/schedules.entity");
const services_entity_1 = require("../../entities/services.entity");
const getServicesService = (userId, userIsAdm) => __awaiter(void 0, void 0, void 0, function* () {
    const schedulesRepository = data_source_1.default.getRepository(schedules_entity_1.Schedules);
    const servicesRepository = data_source_1.default.getRepository(services_entity_1.Services);
    const schedules = yield schedulesRepository.find({
        relations: { provider: true, user: true },
    });
    const services = yield servicesRepository.find({
        relations: { schedule: { user: true, provider: true } },
    });
    if (userIsAdm === true) {
        return services;
    }
    const userScheduleToGet = services.find((elem) => elem.schedule.user.id === userId);
    const providerScheduleToGet = services.find((elem) => elem.schedule.provider.id === userId);
    if (userScheduleToGet) {
        return userScheduleToGet;
    }
    if (providerScheduleToGet) {
        return providerScheduleToGet;
    }
    if (!userScheduleToGet) {
        throw new AppError_1.default("User not found", 404);
    }
    if (!providerScheduleToGet) {
        throw new AppError_1.default("Provider not found", 404);
    }
});
exports.default = getServicesService;
