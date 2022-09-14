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
const data_source_1 = __importDefault(require("../../data-source"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const addresses_users_entity_1 = require("../../entities/addresses_users.entity");
const users_entity_1 = require("../../entities/users.entity");
const getAddressesService = (userId, userIsAdm) => __awaiter(void 0, void 0, void 0, function* () {
    const addressUserRepository = data_source_1.default.getRepository(addresses_users_entity_1.AddressesUsers);
    const pivotAddress = yield addressUserRepository.find();
    const addressToGet = pivotAddress.filter(elem => elem.user.id === userId);
    if (userIsAdm === true) {
        const usersRepository = data_source_1.default.getRepository(users_entity_1.Users);
        const users = yield usersRepository.find({
            relations: { addresses: true },
        });
        if (!users) {
            throw new AppError_1.default("User not found", 404);
        }
        return users;
    }
    return addressToGet;
});
exports.default = getAddressesService;
