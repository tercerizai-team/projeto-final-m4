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
exports.deleteProviderCategoryService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const categories_entity_1 = require("../../entities/categories.entity");
const category_provider_entity_1 = require("../../entities/category_provider.entity");
const providers_entity_1 = require("../../entities/providers.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const deleteProviderCategoryService = (providerId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const providerCategoryRepository = data_source_1.default.getRepository(category_provider_entity_1.CategoryProvider);
    const providersRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const categoryRepository = data_source_1.default.getRepository(categories_entity_1.Categories);
    const provider = yield providersRepository.findOneBy({ id: providerId });
    if (!provider) {
        throw new AppError_1.default("User not provider");
    }
    const category = yield categoryRepository.findOneBy({ id });
    if (!category) {
        throw new AppError_1.default("Invalid category", 404);
    }
    const categoryProvider = yield providerCategoryRepository.findOne({
        where: { category: { id: category.id }, provider: { id: provider.id } },
    });
    if (!categoryProvider) {
        throw new AppError_1.default("Category does not belong to the user");
    }
    yield providerCategoryRepository.delete(categoryProvider.id);
});
exports.deleteProviderCategoryService = deleteProviderCategoryService;
