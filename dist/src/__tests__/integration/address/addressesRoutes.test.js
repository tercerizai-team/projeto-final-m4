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
    test("POST /address - deve ser capaz de cadastrar um novo endereço", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const response = yield (0, supertest_1.default)(app_1.default).post("/address").send(mocks_1.mockedAddress).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    }));
    test("POST /address - não deve ser capaz de cadastrar um endereço repetido", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        yield (0, supertest_1.default)(app_1.default).post("/address").send(mocks_1.mockedAddress).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).post("/address").send(mocks_1.mockedAddress).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("POST /address - não deve ser capaz de cadastrar um endereço sem zipCode", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const response = yield (0, supertest_1.default)(app_1.default).post("/address").send(mocks_1.mockedAddressNoZip).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET /address - usuário deve ser capaz de listar todos os seus endereços existentes", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).get("/address").set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    }));
    test("GET /address - usuário não deve conseguir listar endereços sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).get("/address");
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /address/:id - usuário deve conseguir deletar um endereço", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        yield (0, supertest_1.default)(app_1.default).post("/address").send(mocks_1.mockedAddress).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const addressToDelete = yield (0, supertest_1.default)(app_1.default).get(`/address`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/address/${addressToDelete.body[0].address.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /address/:id - usuário não deve conseguir deletar um endereço com id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        yield (0, supertest_1.default)(app_1.default).post("/address").send(mocks_1.mockedAddress).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const address = yield (0, supertest_1.default)(app_1.default).get("/address").set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/address/123`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /address/:id - usuário deve conseguir atualizar um endereço", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const newAddress = yield (0, supertest_1.default)(app_1.default).post("/address").send(mocks_1.twoMockedAddress).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const addressToDelete = yield (0, supertest_1.default)(app_1.default).get(`/address`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/address/${addressToDelete.body[0].address.id}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mocks_1.mockedAddressUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("state");
        expect(response.body.state).toBe("PR");
    }));
    test("PATCH /address/:id - usuário não deve conseguir atualizar um endereço com id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        yield (0, supertest_1.default)(app_1.default).post("/address").send(mocks_1.mockedAddress).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const address = yield (0, supertest_1.default)(app_1.default).get("/address").set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/address/123}`).set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
});
