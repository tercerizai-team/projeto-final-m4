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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProviderCategoryController = void 0;
const registerProviderCategory_services_1 = require("../../services/providerCategory/registerProviderCategory.services");
const registerProviderCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providerId = req.userId;
    const categoryId = req.body.categoryId;
    const newProviderCategory = yield (0, registerProviderCategory_services_1.registerProviderCategoryService)(categoryId, providerId);
    return res.status(201).json(newProviderCategory);
});
exports.registerProviderCategoryController = registerProviderCategoryController;
