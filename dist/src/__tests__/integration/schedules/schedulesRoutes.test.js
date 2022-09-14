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
describe("/providers", () => {
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
    test("POST /schedule - deve ser capaz de criar um novo agendamento", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const provider = yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const addressInfo = yield (0, supertest_1.default)(app_1.default).post("/address").set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedAddress);
        mocks_1.mockedSchedule.providerId = provider.body.id;
        mocks_1.mockedSchedule.addressId = addressInfo.body.id;
        const response = yield (0, supertest_1.default)(app_1.default).post("/schedule").set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedSchedule);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    }));
    test("POST /schedule - Não deveria ser capaz de criar um agendamento sem id do prestador de serviços", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const addressInfo = yield (0, supertest_1.default)(app_1.default).post("/address").set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedAddress);
        mocks_1.mockedSchedule.providerId = "";
        mocks_1.mockedSchedule.addressId = addressInfo.body.id;
        const response = yield (0, supertest_1.default)(app_1.default).post("/schedule").set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedSchedule);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET /schedule/:id - deve conseguir listar os agendamentos de um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const admLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const userInfo = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/schedule/${userInfo.body[0].schedules[0].id}`).set("Authorization", `Bearer ${userLogin.body.token}`);
        expect(response.status).toBe(200);
    }));
    test("GET /schedule/:id - não deve conseguir listar um usuário sem um token de acesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const admLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const userInfo = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/schedule/${userInfo.body[0].schedules[0].id}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /schedule/:id - deve conseguir atualizar um agendamento de um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const admLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const userInfo = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/schedule/${userInfo.body[0].schedules[0].id}`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedScheduleUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    }));
    test("PATCH /schedule/:id - não deveria conseguir editar um agendamento de id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const admLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const userInfo = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch("/schedule/123").set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedScheduleUpdate);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /schedule/:id - deve conseguir deletar um agendamento de usuário já existente", () => __awaiter(void 0, void 0, void 0, function* () {
        const admLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const userInfo = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/schedule/${userInfo.body[0].schedules[0].id}`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedScheduleUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /schedule/:id - não deveria conseguir deletar um agendamento de id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const admLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userLogin = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const userInfo = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete("/schedule/123").set("Authorization", `Bearer ${userLogin.body.token}`).send(mocks_1.mockedScheduleUpdate);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
});
