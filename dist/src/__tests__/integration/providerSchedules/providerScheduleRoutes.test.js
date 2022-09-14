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
    test("POST /providerSchedule - deve ser capaz de criar um agendamento", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const providerLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const response = yield (0, supertest_1.default)(app_1.default).post("/providerSchedule").send(mocks_1.mockedProviderSchedule).set("Authorization", `Bearer ${providerLogin.body.token}`);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    }));
    test("POST /providerSchedule - não deveria permitir um cadastro sem um dia da semana", () => __awaiter(void 0, void 0, void 0, function* () {
        const providerLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const response = yield (0, supertest_1.default)(app_1.default).post("/providerSchedule").send(mocks_1.mockedProviderScheduleNoDay).set("Authorization", `Bearer ${providerLogin.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET /providerSchedule - deve conseguir listar todas agendas cadastradas para um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const providerLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const response = yield (0, supertest_1.default)(app_1.default).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`);
        expect(response.status).toBe(200);
    }));
    test("GET /providerSchedule - não deve ser capaz de listar agendas sem token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/providerSchedule");
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /providerSchedule/:id - deve ser capaz de atualizar uma agenda com os dados corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const providerLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const providerScheduleInfo = yield (0, supertest_1.default)(app_1.default).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/providerSchedule/${providerScheduleInfo.body.providerSchedule[0].id}`).set("Authorization", `Bearer ${providerLogin.body.token}`).send(mocks_1.mockedProviderScheduleUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /providerSchedule/:id - não deve ser capaz de atualizar uma agenda com id incorreto", () => __awaiter(void 0, void 0, void 0, function* () {
        const providerLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const providerScheduleInfo = yield (0, supertest_1.default)(app_1.default).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch("/providerSchedule/123").set("Authorization", `Bearer ${providerLogin.body.token}`).send(mocks_1.mockedProviderScheduleUpdate);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /providerSchedule/:id - deve ser capaz de deletar uma agenda existente", () => __awaiter(void 0, void 0, void 0, function* () {
        const providerLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const providerScheduleToDelete = yield (0, supertest_1.default)(app_1.default).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/providerSchedule/${providerScheduleToDelete.body.providerSchedule[0].id}`).set("Authorization", `Bearer ${providerLogin.body.token}`).send(mocks_1.mockedProviderScheduleUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /providerSchedule/:id - não deveria ser capaz de deletar uma agenda com id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const providerLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const providerScheduleToDelete = yield (0, supertest_1.default)(app_1.default).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete("/providerSchedule/123").set("Authorization", `Bearer ${providerLogin.body.token}`).send(mocks_1.mockedProviderScheduleUpdate);
        expect(response.status).toBe(404);
    }));
});
