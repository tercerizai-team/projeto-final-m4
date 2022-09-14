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
const data_source_1 = __importDefault(require("../../../data-source"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mocks_1 = require("../../mocks");
describe("/users", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize().then((res) => {
            connection = res;
        }).catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST /service - deve ser capaz de criar um novo agendamento", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const provider = yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const addressInfo = yield (0, supertest_1.default)(app_1.default).post("/address").set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedAddress);
        mocks_1.mockedSchedule.providerId = provider.body.id;
        mocks_1.mockedSchedule.addressId = addressInfo.body.id;
        const scheduleInfo = yield (0, supertest_1.default)(app_1.default).post("/schedule").set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedSchedule);
        yield (0, supertest_1.default)(app_1.default).patch(`/schedule/${scheduleInfo.body.id}`).set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedClientConfirmedUpdate);
        const response = yield (0, supertest_1.default)(app_1.default).post("/service").set("Authorization", `Bearer ${userLogin.body.token}`).send(scheduleInfo.body.id);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    }));
    test("POST /service - não deve ser capaz de criar um novo serviço com id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).post("/service").set("Authorization", `Bearer ${userLogin.body.token}`).send({ scheduleId: "123" });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET /service - deve ser capaz de listar todos serviços de um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).get("/service").set("Authorization", `Bearer ${userLogin.body.token}`);
        expect(response.status).toBe(200);
    }));
    test("GET /service - não deveria ser capaz de listar serviços sem um token", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).get("/service");
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /service/:id - deve ser capaz de atualizar os dados de um serviço", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const serviceInfo = yield (0, supertest_1.default)(app_1.default).get("/service").set("Authorization", `Bearer ${userLogin.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/service/${serviceInfo.body.id}`).set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedServiceUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("isServiceCanceled");
        expect(response.body.isServiceCanceled).toBe(true);
    }));
    test("PATCH /service/:id - não deveria ser capaz de atualizar os dados de um serviço com id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/service/123`).set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedServiceUpdate);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /service/:id - deve ser capaz de deletar um serviço", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const serviceInfo = yield (0, supertest_1.default)(app_1.default).get("/service").set("Authorization", `Bearer ${userLogin.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/service/${serviceInfo.body.id}`).set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedServiceUpdate);
        expect(response.status).toBe(200);
    }));
    test("DELETE /service/:id - não deveria ser capaz de deletar um serviço com id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const userAdmLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/service/123`).set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mocks_1.mockedServiceUpdate);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
});
