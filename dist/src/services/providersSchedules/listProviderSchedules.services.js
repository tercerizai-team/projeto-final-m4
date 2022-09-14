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
exports.listProviderSchedulesService = exports.listAllProviderSchedulesService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const providers_entity_1 = require("../../entities/providers.entity");
const listAllProviderSchedulesService = (userId, isAdm) => __awaiter(void 0, void 0, void 0, function* () {
    const providersRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    if (isAdm) {
        const providersSchedules = yield providersRepository.find({
            relations: { providerSchedule: true }
        });
        return providersSchedules;
    }
    const allProviderSchedules = yield providersRepository.find();
    const providerSchedules = allProviderSchedules.find(provider => provider.id === userId);
    return providerSchedules;
});
exports.listAllProviderSchedulesService = listAllProviderSchedulesService;
const listProviderSchedulesService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const providersRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const providersSchedules = yield providersRepository.find({
        relations: { providerSchedule: true }
    });
    return providersSchedules;
});
exports.listProviderSchedulesService = listProviderSchedulesService;
