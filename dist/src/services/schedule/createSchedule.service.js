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
exports.createScheduleService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const addresses_entity_1 = require("../../entities/addresses.entity");
const providers_entity_1 = require("../../entities/providers.entity");
const schedules_entity_1 = require("../../entities/schedules.entity");
const users_entity_1 = require("../../entities/users.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createScheduleService = ({ hour, serviceDate, description, value, providerId, addressId, finishServiceHour }, data) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleRepository = data_source_1.default.getRepository(schedules_entity_1.Schedules);
    const userRepository = data_source_1.default.getRepository(users_entity_1.Users);
    const providerRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const addressRepository = data_source_1.default.getRepository(addresses_entity_1.Addresses);
    const idUser = data.userId;
    const user = yield userRepository.findOneBy({ id: idUser });
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    const provider = yield providerRepository.findOneBy({ id: providerId });
    if (!provider) {
        throw new AppError_1.default("Provider not found", 404);
    }
    const address = yield addressRepository.findOneBy({ id: addressId });
    if (!address) {
        throw new AppError_1.default("Provider not found", 404);
    }
    const scheduleList = yield scheduleRepository.find();
    const scheduleAlreadyExists = scheduleList.find((schedule) => schedule.hour == hour && schedule.serviceDate == serviceDate);
    if (scheduleAlreadyExists) {
        throw new AppError_1.default("Schedule unavaliable", 400);
    }
    const newSchedule = new schedules_entity_1.Schedules();
    newSchedule.hour = hour;
    newSchedule.finishServiceHour = finishServiceHour;
    newSchedule.serviceDate = serviceDate;
    newSchedule.serviceDescription = description;
    newSchedule.value = value;
    newSchedule.provider = provider;
    newSchedule.address = address;
    newSchedule.user = user;
    scheduleRepository.create(newSchedule);
    yield scheduleRepository.save(newSchedule);
    return newSchedule;
});
exports.createScheduleService = createScheduleService;
