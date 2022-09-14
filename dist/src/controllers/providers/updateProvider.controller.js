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
exports.updateProviderController = void 0;
const updateProvider_services_1 = require("../../services/providers/updateProvider.services");
const updateProviderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providerData = req.body;
    const id = req.params.id;
    const isAdm = req.userIsAdm;
    const providerId = req.userId;
    const newProvider = yield (0, updateProvider_services_1.updateProviderService)(providerData, id, isAdm, providerId);
    return res.json(newProvider);
});
exports.updateProviderController = updateProviderController;
