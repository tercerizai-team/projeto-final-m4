"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateDayHours = exports.verifyHours = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const verifyHours = (initDateNow, dbInitHour, limitDateNow, dbLimitHour) => {
    const newInitHour = initDateNow.getHours();
    const initDate = new Date();
    const initHour = dbInitHour.split(":");
    initDate.setHours(parseInt(initHour[0]));
    const dbHourInit = initDate.getHours();
    const newLimitHour = limitDateNow.getHours();
    const limitDate = new Date();
    const limitHour = dbLimitHour.split(":");
    limitDate.setHours(parseInt(limitHour[0]));
    const dbHourLimit = limitDate.getHours();
    if (newInitHour === dbHourInit && newLimitHour === dbHourLimit) {
        throw new AppError_1.default("este dia já tem horários similares na agenda, favor atualizar");
    }
    if (newInitHour === dbHourInit && newLimitHour < dbHourLimit) {
        throw new AppError_1.default("este dia já tem horários similares na agenda, favor atualizar");
    }
    if (newInitHour < dbHourInit && newLimitHour > dbHourLimit) {
        throw new AppError_1.default("este dia já tem horários similares na agenda, favor atualizar");
    }
    if (newInitHour < dbHourInit && newLimitHour < dbHourLimit && newLimitHour > dbHourInit) {
        throw new AppError_1.default("este dia já tem horários similares na agenda, favor atualizar");
    }
    if (newInitHour === dbHourInit) {
        throw new AppError_1.default("este dia já tem horários similares na agenda, favor atualizar");
    }
    if (newInitHour > dbHourLimit && newLimitHour > newInitHour) {
        return true;
    }
    if (newInitHour < dbHourInit && newLimitHour < dbHourLimit && newLimitHour < dbHourInit) {
        return true;
    }
};
exports.verifyHours = verifyHours;
const validateUpdateDayHours = (providerSchedulesByDay, initDate, limitDate, dayHourId) => {
    let validate = true;
    const initHourUpdate = initDate.getHours();
    const limitHourUpdate = limitDate.getHours();
    providerSchedulesByDay.forEach((provSched) => {
        const splitedDbInitHour = provSched.dayHours.initHour.toString().split(":");
        const dbInitHour = splitedDbInitHour[0];
        const splitedDbLimitHour = provSched.dayHours.limitHour.toString().split(":");
        const dbLimitHour = splitedDbLimitHour[0];
        if (initHourUpdate > dbLimitHour && dayHourId === provSched.dayHours.id) {
            throw new AppError_1.default("não é possível atualizar uma hora inicial para maior que uma final no mesmo dia");
        }
        if (limitHourUpdate < dbInitHour && dayHourId === provSched.dayHours.id) {
            throw new AppError_1.default("não é possível atualizar uma hora inicial para maior que uma final no mesmo dia");
        }
        if (initHourUpdate <= dbLimitHour && dayHourId !== provSched.dayHours.id) {
            throw new AppError_1.default("não é possível atualizar uma hora inicial para maior que uma final já existente");
        }
        if (limitHourUpdate <= dbInitHour && dayHourId !== provSched.dayHours.id) {
            throw new AppError_1.default("não é possível atualizar uma hora final para maior que uma inicial já existente");
        }
    });
    return validate;
};
exports.validateUpdateDayHours = validateUpdateDayHours;
