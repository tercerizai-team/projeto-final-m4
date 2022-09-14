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
const users_feedbacks_entity_1 = require("../../entities/users_feedbacks.entity");
const updateUserFeedbackService = ({ note, comment }, feedbackId) => __awaiter(void 0, void 0, void 0, function* () {
    const usersFeedbacksRepository = data_source_1.default.getRepository(users_feedbacks_entity_1.UsersFeedbacks);
    yield usersFeedbacksRepository.update(feedbackId, {
        note,
        comment,
    });
    const feedback = yield usersFeedbacksRepository.findOneBy({ id: feedbackId });
    return feedback;
});
exports.default = updateUserFeedbackService;
