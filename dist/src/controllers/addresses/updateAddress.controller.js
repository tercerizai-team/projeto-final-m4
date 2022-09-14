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
const updateAddress_services_1 = __importDefault(require("../../services/addresses/updateAddress.services"));
const updateAddressController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state, street, district, number, complement, city, zipCode } = req.body;
    const { id } = req.params;
    const userId = req.userId;
    const isAdm = req.userIsAdm;
    const updateAddress = yield (0, updateAddress_services_1.default)({ state, street, district, number, complement, city, zipCode }, id, userId, isAdm);
    return res.status(200).send(updateAddress);
});
exports.default = updateAddressController;
