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
exports.isTheOwnerOrAdmMiddleware = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const isTheOwnerOrAdmMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        throw new AppError_1.default('Missing id value', 400);
    }
    if (id !== req.userId && req.userIsAdm === false) {
        throw new AppError_1.default('You are not the owner id or admin to access', 401);
    }
    next();
});
exports.isTheOwnerOrAdmMiddleware = isTheOwnerOrAdmMiddleware;
