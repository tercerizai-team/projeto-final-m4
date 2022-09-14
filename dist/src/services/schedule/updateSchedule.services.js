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
const schedules_entity_1 = require("../../entities/schedules.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const updateScheduleService = ({ hour, serviceDate, serviceDescription, value, finishServiceHour, clientConfirmed, providerConfirmed }, id, userId, isAdm) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleRepository = data_source_1.default.getRepository(schedules_entity_1.Schedules);
    const findSchedule = yield scheduleRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            user: true,
            provider: true,
        },
    });
    if (!findSchedule) {
        throw new AppError_1.default("agendamento não encontrado", 404);
    }
    if (isAdm) {
        const newScheule = {
            hour,
            serviceDate,
            serviceDescription,
            value,
            finishServiceHour,
            clientConfirmed,
            providerConfirmed
        };
        yield scheduleRepository.update({ id }, newScheule);
        const updatedSchedule = yield scheduleRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                user: true,
                provider: true,
            },
        });
        return updatedSchedule;
    }
    let newSchedule = {
        hour,
        serviceDate,
        serviceDescription,
        value,
        finishServiceHour
    };
    if (userId === (findSchedule === null || findSchedule === void 0 ? void 0 : findSchedule.user.id)) {
        newSchedule.clientConfirmed = clientConfirmed;
    }
    if (userId === (findSchedule === null || findSchedule === void 0 ? void 0 : findSchedule.provider.id)) {
        newSchedule.providerConfirmed = providerConfirmed;
    }
    yield scheduleRepository.update({ id }, newSchedule);
    const updatedSchedule = yield scheduleRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            user: true,
            provider: true,
        },
    });
    return updatedSchedule;
});
exports.default = updateScheduleService;
