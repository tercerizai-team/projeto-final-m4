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
exports.createProviderService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const providers_entity_1 = require("../../entities/providers.entity");
const addresses_entity_1 = require("../../entities/addresses.entity");
const createProviderService = ({ name, email, password, phone, address, }) => __awaiter(void 0, void 0, void 0, function* () {
    const providersRepository = data_source_1.default.getRepository(providers_entity_1.Providers);
    const addressRepository = data_source_1.default.getRepository(addresses_entity_1.Addresses);
    const verifyEmail = yield providersRepository.findOneBy({ email: email });
    if (verifyEmail) {
        throw new AppError_1.default("User already exists", 400);
    }
    const { state, street, district, number, complement, city, zipCode, } = address;
    const addressAlreadyExists = yield addressRepository.findOne({
        where: {
            street: address.street,
            number: address.number,
            complement: address.complement,
        },
    });
    if (addressAlreadyExists) {
        throw new AppError_1.default("Address already exists", 400);
    }
    const newAddress = new addresses_entity_1.Addresses();
    newAddress.zipCode = zipCode;
    newAddress.city = city;
    newAddress.complement = complement;
    newAddress.number = number;
    newAddress.district = district;
    newAddress.street = street;
    newAddress.state = state;
    yield addressRepository.save(newAddress);
    const newProvider = new providers_entity_1.Providers();
    newProvider.name = name;
    newProvider.email = email;
    newProvider.password = yield (0, bcryptjs_1.hash)(password, 10);
    newProvider.phone = phone;
    newProvider.isPremium = false;
    newProvider.isActive = true;
    newProvider.address = newAddress;
    providersRepository.create(newProvider);
    yield providersRepository.save(newProvider);
    return newProvider;
});
exports.createProviderService = createProviderService;
