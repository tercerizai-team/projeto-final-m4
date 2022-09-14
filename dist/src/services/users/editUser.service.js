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
exports.editUserService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const users_entity_1 = require("../../entities/users.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const editUserService = ({ name, email, password, phone }, isAdm, id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(users_entity_1.Users);
    if (userId !== id && isAdm === false) {
        throw new AppError_1.default("You are not allowed", 400);
    }
    const account = yield userRepository.findOneBy({ id });
    if (!account) {
        throw new AppError_1.default('User not found', 404);
    }
    if (phone) {
        if ((phone === null || phone === void 0 ? void 0 : phone.length) !== 11) {
            throw new AppError_1.default('Phone must have eleven numbers', 400);
        }
    }
    let hashedPassword = password;
    if (password) {
        hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    }
    const newDataUser = {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        updatedAt: new Date()
    };
    yield userRepository.update({ id }, newDataUser);
    const userUpdated = yield userRepository.findOneBy({ id });
    const returnUser = {
        email: userUpdated === null || userUpdated === void 0 ? void 0 : userUpdated.email,
        name: userUpdated === null || userUpdated === void 0 ? void 0 : userUpdated.name,
        phone: userUpdated === null || userUpdated === void 0 ? void 0 : userUpdated.phone,
        createdAt: userUpdated === null || userUpdated === void 0 ? void 0 : userUpdated.createdAt,
        updatedAt: userUpdated === null || userUpdated === void 0 ? void 0 : userUpdated.updatedAt
    };
    Object.defineProperty(userUpdated, 'password', {
        enumerable: false,
        writable: true
    });
    return returnUser;
});
exports.editUserService = editUserService;
