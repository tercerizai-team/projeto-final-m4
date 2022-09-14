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
describe("/usersFeedbacks", () => {
    let connection;
    let admLoginResponse;
    let admId;
    let userLoginResponse;
    let userId;
    let providerLoginResponse;
    let feedbackId;
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
        admLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        userLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedUserNotAdm);
        providerLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedProviderLogin);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST usersFeedbacks - Um provider deve conseguir enviar um feedback a um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/usersFeedbacks")
            .set("Authorization", `Bearer ${providerLoginResponse.body.token}`)
            .send(Object.assign(Object.assign({}, mocks_1.mockedFeedback), { userId: admId }));
        feedbackId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("note");
        expect(response.body.comment).toBe(mocks_1.mockedFeedback.comment);
    }));
    test("POST usersFeedbacks - Um provider não deve conseguir enviar mais de um feedback a um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/usersFeedbacks")
            .set("Authorization", `Bearer ${providerLoginResponse.body.token}`)
            .send(Object.assign(Object.assign({}, mocks_1.mockedFeedback), { userId: admId }));
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("POST usersFeedbacks - User não deve conseguir enviar um feedback a um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/usersFeedbacks")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
            .send(Object.assign(Object.assign({}, mocks_1.mockedFeedback), { admId }));
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET usersFeedbacks - Um usuário logado deve ser capaz de ver os feedbacks de outro user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/usersFeedbacks/${admId}`)
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body[0].note).toBe(mocks_1.mockedFeedback.note);
    }));
    test("PATCH usersFeedbacks - Um provider não pode editar um feedback", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/usersFeedbacks/${feedbackId}`)
            .set("Authorization", `Bearer ${providerLoginResponse.body.token}`)
            .send(mocks_1.mockedUpdateFeedback);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH usersFeedbacks - Um administrador deve poder editar um feedback", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/usersFeedbacks/${feedbackId}`)
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
            .send(mocks_1.mockedUpdateFeedback);
        expect(response.status).toBe(200);
        expect(response.body.note).toBe(mocks_1.mockedUpdateFeedback.note);
    }));
    test("DELETE usersFeedbacks - Um usuário ou provider não podem deletar um feedback", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/usersFeedbacks/${feedbackId}`)
            .set("Authorization", `Bearer ${providerLoginResponse.body.token}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE usersFeedbacks - Um administrador deve poder deletar um feedback", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/usersFeedbacks/${feedbackId}`)
            .set("Authorization", `Bearer ${admLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    }));
});
