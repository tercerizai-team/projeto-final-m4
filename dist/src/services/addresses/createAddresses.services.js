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
const addresses_entity_1 = require("../../entities/addresses.entity");
const data_source_1 = __importDefault(require("../../data-source"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const uuid_1 = require("uuid");
const addresses_users_entity_1 = require("../../entities/addresses_users.entity");
const users_entity_1 = require("../../entities/users.entity");
const createAddressesService = ({ state, city, zipCode, number, street, district, complement, }, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!zipCode || zipCode.length !== 8) {
        throw new AppError_1.default("zipCode precisa possuir 8 dígitos");
    }
    const addressesRepository = data_source_1.default.getRepository(addresses_entity_1.Addresses);
    const address = yield addressesRepository.find();
    const newAddress = new addresses_entity_1.Addresses();
    newAddress.id = (0, uuid_1.v4)();
    newAddress.state = state;
    newAddress.city = city;
    newAddress.zipCode = zipCode;
    newAddress.number = number;
    newAddress.street = street;
    newAddress.district = district;
    newAddress.complement = complement;
    addressesRepository.create(newAddress);
    yield addressesRepository.save(newAddress);
    if (userId) {
        const addressUserRepository = data_source_1.default.getRepository(addresses_users_entity_1.AddressesUsers);
        const userRepository = data_source_1.default.getRepository(users_entity_1.Users);
        const users = yield userRepository.find();
        const user = users.find((user) => user.id === userId);
        const newPivotAddress = {
            id: (0, uuid_1.v4)(),
            address: newAddress,
            user: user,
        };
        const addressAlreadyExists = address.find(address => address.street === street && address.number === number && address.zipCode === zipCode);
        if (addressAlreadyExists) {
            throw new AppError_1.default("address already exists", 400);
        }
        addressUserRepository.create(newPivotAddress);
        yield addressUserRepository.save(newPivotAddress);
    }
    return newAddress;
});
exports.default = createAddressesService;
