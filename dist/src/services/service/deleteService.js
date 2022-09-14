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
exports.deleteServiceService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const services_entity_1 = require("../../entities/services.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const deleteServiceService = (serviceId, userId, isAdm) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceRepository = data_source_1.default.getRepository(services_entity_1.Services);
    const service = yield serviceRepository.findOne({
        where: {
            id: serviceId,
        },
        relations: {
            schedule: { user: true, provider: true },
        },
    });
    if (!service) {
        throw new AppError_1.default("Service not found", 404);
    }
    if (service.schedule.user.id !== userId ||
        service.schedule.provider.id !== userId) {
        if (!isAdm) {
            throw new AppError_1.default("Not allowed", 401);
        }
    }
    return serviceRepository.delete(service.id);
});
exports.deleteServiceService = deleteServiceService;
