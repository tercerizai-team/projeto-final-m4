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
exports.editCategoryService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const categories_entity_1 = require("../../entities/categories.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const editCategoryService = (id, newName) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepository = data_source_1.default.getRepository(categories_entity_1.Categories);
    const categories = yield categoryRepository.find();
    const category = categories.find(category => category.id === id);
    const categoryAlreadyExists = categories.find(category => {
        if (category.name === newName && category.id !== id) {
            return true;
        }
    });
    if (categoryAlreadyExists) {
        throw new AppError_1.default('Category name already exists', 400);
    }
    if (!category) {
        throw new AppError_1.default('Category not found', 404);
    }
    if (!newName) {
        throw new AppError_1.default('Missing name value', 400);
    }
    if (category.name === newName) {
        throw new AppError_1.default('Choose another category name');
    }
    yield categoryRepository.update(category.id, { name: newName });
    return true;
});
exports.editCategoryService = editCategoryService;
