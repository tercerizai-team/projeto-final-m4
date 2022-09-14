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
describe("/servicesFeedbacks", () => {
    let connection;
    let admLoginResponse;
    let admId;
    let userLoginResponse;
    let userId;
    let providerLoginResponse;
    let providerId;
    let feedbackId;
    let serviceId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        const createUserAdm = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const createUser = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const createProvider = yield (0, supertest_1.default)(app_1.default)
            .post("/providers")
            .send(mocks_1.mockedProvider);
        admId = createUserAdm.body.id;
        userId = createUser.body.id;
        providerId = createProvider.body.id;
        admLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        userLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedUserNotAdm);
        providerLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedProviderLogin);
        const address = yield (0, supertest_1.default)(app_1.default)
            .post("/address")
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
            .send(mocks_1.mockedAddress);
        const schedule = yield (0, supertest_1.default)(app_1.default)
            .post("/schedule")
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
            .send(Object.assign(Object.assign({}, mocks_1.mockedSchedule), { providerId: providerId, addressId: address.body.id }));
        const updateSchedule = yield (0, supertest_1.default)(app_1.default)
            .patch(`/schedule/${schedule.body.id}`)
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
            .send({ clientConfirmed: true, providerConfirmed: true });
        const service = yield (0, supertest_1.default)(app_1.default)
            .post(`/service`)
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
            .send({ scheduleId: updateSchedule.body.id });
        serviceId = service.body.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST servicesFeedbacks - Um usuário deve conseguir enviar um feedback a um serviço", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/servicesFeedbacks")
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
            .send(Object.assign(Object.assign({}, mocks_1.mockedFeedback), { providerId, serviceId }));
        feedbackId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("note");
        expect(response.body.comment).toBe(mocks_1.mockedFeedback.comment);
    }));
    test("POST servicesFeedbacks - Um usuário não deve conseguir enviar mais que um feedback a um serviço", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/servicesFeedbacks")
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
            .send(Object.assign(Object.assign({}, mocks_1.mockedFeedback), { providerId, serviceId }));
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("POST servicesFeedbacks - Usuário não relacionado com a schedule não deve conseguir enviar um feedback ao um service", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/servicesFeedbacks")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
            .send(Object.assign(Object.assign({}, mocks_1.mockedFeedback), { providerId, serviceId }));
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET servicesFeedbacks - Um usuário logado deve ser capaz de ver os feedbacks do provider", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/servicesFeedbacks/${providerId}`)
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body[0].note).toBe(mocks_1.mockedFeedback.note);
    }));
    test("PATCH servicesFeedbacks - Um usuário não pode editar um feedback", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/servicesFeedbacks/${feedbackId}`)
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
            .send(mocks_1.mockedUpdateFeedback);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH servicesFeedbacks - Um administrador deve poder editar um feedback", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/servicesFeedbacks/${feedbackId}`)
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
            .send(mocks_1.mockedUpdateFeedback);
        expect(response.status).toBe(200);
        expect(response.body.note).toBe(mocks_1.mockedUpdateFeedback.note);
    }));
    test("DELETE servicesFeedbacks - Um usuário ou provider não podem deletar um feedback", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/servicesFeedbacks/${feedbackId}`)
            .set("Authorization", `Bearer ${providerLoginResponse.body.token}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE servicesFeedbacks - Um administrador deve poder deletar um feedback", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/servicesFeedbacks/${feedbackId}`)
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    }));
});
