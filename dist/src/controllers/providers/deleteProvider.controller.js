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
exports.deleteProviderController = void 0;
const deleteProvider_services_1 = require("../../services/providers/deleteProvider.services");
const deleteProviderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isAdm = req.userIsAdm;
    const providerId = req.userId;
    yield (0, deleteProvider_services_1.deleteProviderService)(id, isAdm, providerId);
    return res.json({ message: "Provider deleted" });
});
exports.deleteProviderController = deleteProviderController;
