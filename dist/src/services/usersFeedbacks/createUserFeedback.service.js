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
const users_entity_1 = require("../../entities/users.entity");
const users_feedbacks_entity_1 = require("../../entities/users_feedbacks.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createUserFeedbackService = ({ note, comment, userId }, providerId) => __awaiter(void 0, void 0, void 0, function* () {
    const usersFeedbacksRepository = data_source_1.default.getRepository(users_feedbacks_entity_1.UsersFeedbacks);
    const usersRepository = data_source_1.default.getRepository(users_entity_1.Users);
    const providersRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const user = yield usersRepository.findOneBy({ id: userId });
    if (!user) {
        throw new AppError_1.default("User not found", 404);
    }
    const provider = yield providersRepository.findOne({
        where: { id: providerId },
        relations: { givedFeedbacks: true },
    });
    if (!provider) {
        throw new AppError_1.default("Provider not found", 404);
    }
    const providerGivenFeedbacks = provider.givedFeedbacks;
    const userFeedbacks = user.feedbacks;
    userFeedbacks.forEach((feedback) => {
        if (providerGivenFeedbacks.some((givedFeedback) => givedFeedback.id === feedback.id)) {
            throw new AppError_1.default("Provider already given feedback to this user");
        }
    });
    const feedback = yield usersFeedbacksRepository.save({
        note,
        comment,
        user,
        provider,
    });
    return feedback;
});
exports.default = createUserFeedbackService;
