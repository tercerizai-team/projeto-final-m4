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
exports.updateProviderService = void 0;
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = __importDefault(require("../../data-source"));
const categories_entity_1 = require("../../entities/categories.entity");
const category_provider_entity_1 = require("../../entities/category_provider.entity");
const providers_entity_1 = require("../../entities/providers.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const updateProviderService = (providerData, id, isAdm, providerId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const providerRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const categoriesRepository = data_source_1.default.getRepository(categories_entity_1.Categories);
    const providersCategoriesRepository = data_source_1.default.getRepository(category_provider_entity_1.CategoryProvider);
    const provider = yield providerRepository.findOneBy({ id });
    if (providerId !== id && !isAdm) {
        throw new AppError_1.default("Unauthorized access", 401);
    }
    if (!provider) {
        throw new AppError_1.default("User not Found", 404);
    }
    const providers = yield providerRepository.find();
    if (providerData.email
        ? providers.some((provider) => provider.email === providerData.email && provider.id !== id)
        : false) {
        throw new Error("Email is already in use");
    }
    (_a = providerData.categories) === null || _a === void 0 ? void 0 : _a.forEach((categoryId) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoriesRepository.findOneBy({ id: categoryId });
        if (!category) {
            throw new AppError_1.default("Category not exists");
        }
        const providersCategoriesExists = yield providersCategoriesRepository.count({ where: { category: { id: categoryId }, provider: { id: provider.id } } });
        if (!providersCategoriesExists) {
            yield providersCategoriesRepository.save({
                category,
                provider,
            });
        }
    }));
    yield providerRepository.update(provider.id, {
        email: providerData.email,
        name: providerData.name,
        phone: providerData.phone,
        password: providerData.password
            ? yield (0, bcryptjs_1.hash)(providerData.password, 10)
            : provider.password,
        isPremium: providerData.isPremium,
    });
    const newProvider = yield providerRepository.findOneBy({ id });
    return newProvider;
});
exports.updateProviderService = updateProviderService;
