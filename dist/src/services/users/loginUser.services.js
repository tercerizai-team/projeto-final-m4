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
exports.loginUserService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const users_entity_1 = require("../../entities/users.entity");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const providers_entity_1 = require("../../entities/providers.entity");
const loginUserService = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(users_entity_1.Users);
    const providerRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    let account = yield userRepository.findOne({ where: { email: email } });
    if (!account) {
        account = yield providerRepository.findOne({ where: { email: email } });
    }
    if (!account) {
        throw new AppError_1.default("Invalid email or password", 403);
    }
    if (account.isActive === false) {
        throw new AppError_1.default("User are not active", 400);
    }
    const passwordMatch = yield (0, bcryptjs_1.compare)(password, account.password);
    if (!passwordMatch) {
        throw new AppError_1.default("Invalid email or password", 403);
    }
    const token = jsonwebtoken_1.default.sign({
        email: email,
        userId: account.id,
        userIsAdm: account instanceof users_entity_1.Users ? account.isAdm : false,
    }, String(process.env.SECRET_KEY), {
        expiresIn: "2h",
    });
    return token;
});
exports.loginUserService = loginUserService;
