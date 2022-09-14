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
exports.updateServiceFeedbackController = void 0;
const updateServiceFeedback_services_1 = __importDefault(require("../../services/servicesFeedbacks/updateServiceFeedback.services"));
const updateServiceFeedbackController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { note, comment } = req.body;
    const feedbackId = req.params.id;
    const feedback = yield (0, updateServiceFeedback_services_1.default)({ note, comment }, feedbackId);
    return res.json(feedback);
});
exports.updateServiceFeedbackController = updateServiceFeedbackController;
