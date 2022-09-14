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
exports.getProviderController = void 0;
const getProvider_services_1 = require("../../services/providers/getProvider.services");
const getProviderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const provider = yield (0, getProvider_services_1.getProviderService)(id);
    return res.status(200).json(provider);
});
exports.getProviderController = getProviderController;
