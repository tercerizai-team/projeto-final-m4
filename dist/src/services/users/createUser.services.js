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
exports.createUserService = void 0;
const users_entity_1 = require("../../entities/users.entity");
const data_source_1 = __importDefault(require("../../data-source"));
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createUserService = ({ name, email, password, phone, isAdm }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(users_entity_1.Users);
    const users = yield userRepository.find();
    const emailAlreadyExists = users.find(user => user.email === email);
    if (emailAlreadyExists) {
        throw new AppError_1.default("user already exists", 400);
    }
    const createdAt = new Date();
    const updatedAt = new Date();
    const user = new users_entity_1.Users();
    user.name = name;
    user.email = email;
    user.password = yield (0, bcryptjs_1.hash)(password, 10);
    user.createdAt = createdAt;
    user.updatedAt = updatedAt;
    user.isActive = true;
    user.phone = phone;
    user.isAdm = isAdm;
    userRepository.create(user);
    yield userRepository.save(user);
    return user;
});
exports.createUserService = createUserService;
