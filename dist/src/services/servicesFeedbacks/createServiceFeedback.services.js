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
const providers_entity_1 = require("../../entities/providers.entity");
const services_entity_1 = require("../../entities/services.entity");
const services_feedbacks_entity_1 = require("../../entities/services_feedbacks.entity");
const users_entity_1 = require("../../entities/users.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createServiceFeedbackService = ({ note, comment, serviceId, providerId }, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const servicesFeedbacksRepository = data_source_1.default.getRepository(services_feedbacks_entity_1.ServicesFeedbacks);
    const providersRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const servicesRepository = data_source_1.default.getRepository(services_entity_1.Services);
    const usersRepository = data_source_1.default.getRepository(users_entity_1.Users);
    const provider = yield providersRepository.findOneBy({
        id: providerId,
    });
    if (!provider) {
        throw new AppError_1.default("Provider not found", 404);
    }
    const user = yield usersRepository.findOne({
        where: { id: userId },
        relations: { givedfeedbacks: true },
    });
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    const service = yield servicesRepository.findOne({
        where: {
            id: serviceId,
        },
        relations: {
            schedule: {
                provider: true,
                user: true,
            },
        },
    });
    if (!service) {
        throw new AppError_1.default("Service not found", 404);
    }
    if (service.schedule.user.id !== userId) {
        throw new AppError_1.default("User not related to the schedule");
    }
    const userGivenFeedbacks = user.givedfeedbacks;
    const providerFeedbacks = provider.feedbacks;
    providerFeedbacks.forEach((feedback) => {
        if (userGivenFeedbacks.some((givenFeedback) => givenFeedback.id === feedback.id)) {
            throw new AppError_1.default("User already given feedback to this service");
        }
    });
    const serviceFeedback = yield servicesFeedbacksRepository.save({
        note,
        comment,
        service,
        provider,
        user,
    });
    return serviceFeedback;
});
exports.default = createServiceFeedbackService;
