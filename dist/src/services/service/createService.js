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
exports.createServiceService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const schedules_entity_1 = require("../../entities/schedules.entity");
const services_entity_1 = require("../../entities/services.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createServiceService = (scheduleId) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceRepository = data_source_1.default.getRepository(services_entity_1.Services);
    const scheduleRepository = data_source_1.default.getRepository(schedules_entity_1.Schedules);
    const schedule = yield scheduleRepository.findOneBy({ id: scheduleId });
    if (!schedule) {
        throw new AppError_1.default("Schedule not found", 404);
    }
    if (!schedule.providerConfirmed || !schedule.clientConfirmed) {
        throw new AppError_1.default("Both need to confirm the service", 400);
    }
    const newService = new services_entity_1.Services();
    newService.schedule = schedule;
    yield serviceRepository.save(newService);
    return newService;
});
exports.createServiceService = createServiceService;
