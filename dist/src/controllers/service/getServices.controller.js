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
const class_transformer_1 = require("class-transformer");
const getServicesService_1 = __importDefault(require("../../services/service/getServicesService"));
const getServicesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdm = req.userIsAdm;
    const userId = req.userId;
    const services = yield (0, getServicesService_1.default)(userId, isAdm);
    return res.status(200).json((0, class_transformer_1.instanceToPlain)(services));
});
exports.default = getServicesController;
