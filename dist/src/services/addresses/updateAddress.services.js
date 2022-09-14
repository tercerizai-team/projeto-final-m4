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
const addresses_entity_1 = require("../../entities/addresses.entity");
const addresses_users_entity_1 = require("../../entities/addresses_users.entity");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const updateAddressService = ({ state, street, district, number, complement, city, zipCode }, id, userId, isAdm) => __awaiter(void 0, void 0, void 0, function* () {
    const addressRepository = data_source_1.default.getRepository(addresses_entity_1.Addresses);
    const addressesUsersRepository = data_source_1.default.getRepository(addresses_users_entity_1.AddressesUsers);
    const pivotAddresses = yield addressesUsersRepository.find();
    const address = yield addressRepository.findOneBy({ id });
    if (!address) {
        throw new AppError_1.default("Address not found", 400);
    }
    const addressToPatch = pivotAddresses.find(elem => elem.address.id === id);
    if ((addressToPatch === null || addressToPatch === void 0 ? void 0 : addressToPatch.user.id) !== userId && isAdm === false) {
        throw new AppError_1.default("You do not have permission", 400);
    }
    const newAddress = {
        state,
        street,
        district,
        number,
        complement,
        city,
        zipCode,
    };
    yield addressRepository.update({ id }, newAddress);
    const updatedAddress = yield addressRepository.findOneBy({ id });
    return updatedAddress;
});
exports.default = updateAddressService;
