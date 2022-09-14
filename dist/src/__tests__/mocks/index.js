"use strict";
//aqui ficam os Mocks para testes
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedServiceUpdate = exports.mockedClientConfirmedUpdate = exports.mockedScheduleUpdate = exports.mockedSchedule = exports.mockedUpdateFeedback = exports.mockedFeedback = exports.mockedProviderScheduleUpdate = exports.mockedProviderScheduleNoDay = exports.mockedProviderSchedule = exports.mockedCategoryUpdate = exports.mockedCategory = exports.mockedAddressUpdate = exports.mockedAddressNoZip = exports.twoMockedAddress = exports.mockedAddress = exports.mockedProviderUpdate = exports.mockedProviderWithoutAddress = exports.mockedProviderPremium = exports.mockedProviderTest = exports.mockedUserLogin = exports.mockedProviderLogin = exports.mockedProvider = exports.mockedUserUpdate = exports.mockedUserAdm = exports.mockedUser = exports.mockedUserNotAdm = void 0;
//users
exports.mockedUserNotAdm = {
    name: "Jorgin",
    email: "jorgin@mail.com",
    password: "1234",
    phone: "4111111111",
    isAdm: false,
};
exports.mockedUser = {
    name: "Jorjão",
    email: "jorjão@mail.com",
    password: "1234",
    phone: "4111111111",
    isAdm: false,
};
exports.mockedUserAdm = {
    name: "Jorge",
    email: "jorge@mail.com",
    password: "1234",
    phone: "4111111111",
    isAdm: true,
};
exports.mockedUserUpdate = {
    name: "Mateus",
};
exports.mockedProvider = {
    email: "exemplo@gmail.com",
    name: "Matheus Willcox",
    phone: "32098765456",
    password: "432423!@aa",
    isPremium: false,
    address: {
        state: "PE",
        street: "Rua tal",
        district: "Bairro tal",
        number: "32",
        complement: "Portão azul",
        city: "Recife",
        zipCode: "12345678",
    },
};
exports.mockedProviderLogin = {
    email: "exemplo@gmail.com",
    password: "432423!@aa"
};
exports.mockedUserLogin = {
    email: "jorgin@mail.com",
    password: "123"
};
exports.mockedProviderTest = {
    email: "teste@gmail.com",
    name: "Matheus Willcox",
    phone: "32098765456",
    password: "432423!@aa",
    isPremium: false,
    address: {
        state: "PR",
        street: "Rua Fabio jr",
        district: "Bairro tal",
        number: "10",
        complement: "Portão azul",
        city: "Recife",
        zipCode: "12345679",
    },
};
exports.mockedProviderPremium = {
    email: "exemplo2@gmail.com",
    name: "Matheus Willcox",
    phone: "32098765456",
    password: "432423!@aa",
    isPremium: true,
    address: {
        state: "PE",
        street: "Rua tal",
        district: "Bairro tal",
        number: "32",
        complement: "Portão azul",
        city: "Recife",
        zipCode: "12345678",
    },
};
exports.mockedProviderWithoutAddress = {
    email: "exemplo@gmail.com",
    name: "Matheus Willcox",
    phone: "32098765456",
    password: "432423!@aa",
    isPremium: false,
};
exports.mockedProviderUpdate = {
    name: "jorgin"
};
exports.mockedAddress = {
    state: "PE",
    street: "Rua tal",
    district: "Bairro tal",
    number: "32",
    complement: "Portão azul",
    city: "Recife",
    zipCode: "12345678"
};
exports.twoMockedAddress = {
    state: "PE",
    street: "Rua tal",
    district: "Bairro tal",
    number: "31",
    complement: "Portão azul",
    city: "Recife",
    zipCode: "12345679"
};
exports.mockedAddressNoZip = {
    state: "PE",
    street: "Rua tal",
    district: "Bairro tal",
    number: "32",
    complement: "Portão azul",
    city: "Recife",
    zipCode: ""
};
exports.mockedAddressUpdate = {
    state: "PR",
};
exports.mockedCategory = {
    name: "Casa"
};
exports.mockedCategoryUpdate = {
    name: "Jardim"
};
exports.mockedProviderSchedule = {
    day: 5,
    initHour: "05:00",
    limitHour: "20:00"
};
exports.mockedProviderScheduleNoDay = {
    initHour: "05:00",
    limitHour: "20:00"
};
exports.mockedProviderScheduleUpdate = {
    initHour: "08:00",
    limitHour: "12:00"
};
exports.mockedFeedback = {
    note: 5,
    comment: "Ótimo cliente"
};
exports.mockedUpdateFeedback = {
    note: 4
};
exports.mockedSchedule = {
    hour: "10:00",
    serviceDate: "2021-12-05",
    description: "Lavar o carro",
    value: 50.0,
    providerId: "",
    addressId: ""
};
exports.mockedScheduleUpdate = {
    hour: "12:00"
};
exports.mockedClientConfirmedUpdate = {
    clientConfirmed: true,
    providerConfirmed: true
};
exports.mockedServiceUpdate = {
    isServiceCanceled: true
};
