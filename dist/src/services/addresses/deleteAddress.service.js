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
exports.deleteAddressService = void 0;
const addresses_entity_1 = require("../../entities/addresses.entity");
const data_source_1 = __importDefault(require("../../data-source"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const addresses_users_entity_1 = require("../../entities/addresses_users.entity");
const deleteAddressService = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const addressRepository = data_source_1.default.getRepository(addresses_entity_1.Addresses);
    const addressUserRepository = data_source_1.default.getRepository(addresses_users_entity_1.AddressesUsers);
    const address = yield addressRepository.findOneBy({ id });
    if (!address) {
        throw new AppError_1.default("Address not found");
    }
    const pivotAddress = yield addressUserRepository.find();
    const addressToDelete = pivotAddress.find(elem => elem.address.id === id && elem.user.id === userId);
    yield addressUserRepository.delete(addressToDelete === null || addressToDelete === void 0 ? void 0 : addressToDelete.id);
    yield addressRepository.delete(id);
    return true;
});
exports.deleteAddressService = deleteAddressService;
