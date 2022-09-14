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
const services_feedbacks_entity_1 = require("../../entities/services_feedbacks.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const updateServiceFeedbackService = ({ note, comment }, feedbackId) => __awaiter(void 0, void 0, void 0, function* () {
    const servicesFeedbacksRepository = data_source_1.default.getRepository(services_feedbacks_entity_1.ServicesFeedbacks);
    const feedbackExists = yield servicesFeedbacksRepository.count({
        where: { id: feedbackId },
    });
    if (!feedbackExists) {
        throw new AppError_1.default("Feedback not found", 404);
    }
    yield servicesFeedbacksRepository.update(feedbackId, {
        note,
        comment,
    });
    const feedback = yield servicesFeedbacksRepository.findOneBy({
        id: feedbackId,
    });
    return feedback;
});
exports.default = updateServiceFeedbackService;
