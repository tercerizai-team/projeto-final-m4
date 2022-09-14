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
exports.deleteProviderService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const providers_entity_1 = require("../../entities/providers.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const deleteProviderService = (id, isAdm, providerId) => __awaiter(void 0, void 0, void 0, function* () {
    const providerRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const provider = yield providerRepository.findOneBy({ id });
    if (providerId !== id && !isAdm) {
        throw new AppError_1.default("Unauthorized access", 401);
    }
    if (!provider) {
        throw new AppError_1.default("User not Found", 404);
    }
    if (!provider.isActive) {
        throw new AppError_1.default("Inactive user");
    }
    yield providerRepository.update(provider.id, {
        isActive: false
    });
});
exports.deleteProviderService = deleteProviderService;
