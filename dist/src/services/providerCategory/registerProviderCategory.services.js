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
exports.registerProviderCategoryService = void 0;
const uuid_1 = require("uuid");
const data_source_1 = __importDefault(require("../../data-source"));
const categories_entity_1 = require("../../entities/categories.entity");
const category_provider_entity_1 = require("../../entities/category_provider.entity");
const providers_entity_1 = require("../../entities/providers.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const registerProviderCategoryService = (categoryId, providerId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!categoryId || !providerId) {
        throw new AppError_1.default("categoria não encontrada", 404);
    }
    const providerCategoriesRepository = data_source_1.default.getRepository(category_provider_entity_1.CategoryProvider);
    const providersRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const categoriesRepository = data_source_1.default.getRepository(categories_entity_1.Categories);
    const providerCategories = yield providerCategoriesRepository.find({ relations: { provider: true } });
    const providers = yield providersRepository.find();
    const categories = yield categoriesRepository.find();
    const providerCategoryAlreadyExists = providerCategories.find(providerCategory => providerCategory.category.id === categoryId && providerCategory.provider.id === providerId);
    if (providerCategoryAlreadyExists) {
        throw new AppError_1.default("esse usuário já possui esta categoria em sua lista");
    }
    const provider = providers.find(prov => prov.id === providerId);
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) {
        throw new AppError_1.default("categoria não encontrada", 404);
    }
    const newProviderCategory = {
        id: (0, uuid_1.v4)(),
        category,
        provider
    };
    yield providerCategoriesRepository.save(newProviderCategory);
    return newProviderCategory;
});
exports.registerProviderCategoryService = registerProviderCategoryService;
