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
exports.getCategoryController = void 0;
const getCategory_services_1 = require("../../services/categories/getCategory.services");
const getCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const category = yield (0, getCategory_services_1.getCategoryService)(id);
    return res.status(200).json(category);
});
exports.getCategoryController = getCategoryController;
