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
    test("POST providers - Deve conseguir cadastrar um prestador de serviço", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).toHaveProperty("address");
        expect(response.body.isPremium).toBe(false);
    }));
    test("POST providers - Não deveria conseguir cadastrar um prestador sem endereço", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProviderWithoutAddress);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    }));
    test("GET providers - Deve ser capaz de listar todos os prestadores registrados", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProviderTest);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const response = yield (0, supertest_1.default)(app_1.default).get("/providers").set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    }));
    test("GET providers - Deve ser capaz de listar todos os prestadores registrados sem token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const response = yield (0, supertest_1.default)(app_1.default).get("/providers");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    }));
    test("GET providers/:id - Deve ser capaz de listar o perfil do prestador como dono do perfil", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const providerLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const providerOne = yield (0, supertest_1.default)(app_1.default).get("/providers").send(adminLoginResponse.body.token);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/providers/${providerOne.body[0].id}`).set("Authorization", `Bearer ${providerLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("address");
        expect(response.body).toHaveProperty("schedules");
    }));
    test("GET providers/:id - Não deveria ser capaz de listar perfil com o token inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProviderTest);
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const providerOne = yield (0, supertest_1.default)(app_1.default).get("/providers").send(adminLoginResponse.body.token);
        const providerTwoResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProviderTest);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/providers/${providerOne.body[0].id}`).set("Authorization", `Bearer ${providerTwoResponse.body.token}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("GET providers/:id - Adm deve ser capaz de listar perfil que não é o seu próprio", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const providerOne = yield (0, supertest_1.default)(app_1.default).get("/providers");
        const response = yield (0, supertest_1.default)(app_1.default).get(`/providers/${providerOne.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("address");
        expect(response.body).toHaveProperty("schedules");
    }));
    test("PATCH providers/:id - Adm deve ser capaz de editar um prestador de serviço", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userToPatch = yield (0, supertest_1.default)(app_1.default).get("/providers/");
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/providers/${userToPatch.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedProviderUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name");
        expect(response.body.name).toBe("jorgin");
    }));
    test("PATCH providers/:id - Dono do perfil deve ser capaz de editar seu próprio perfil", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const mockedLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const userToPatch = yield (0, supertest_1.default)(app_1.default).get("/providers/");
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/providers/${userToPatch.body[0].id}`).set("Authorization", `Bearer ${mockedLoginResponse.body.token}`).send(mocks_1.mockedProviderUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name");
        expect(response.body.name).toBe("jorgin");
    }));
    test("PATCH providers/:id - Um prestador não deve ser capaz de editar o perfil de outro", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProviderTest);
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const mockedLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const userToPatch = yield (0, supertest_1.default)(app_1.default).get("/providers/");
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/providers/${userToPatch.body[1].id}`).set("Authorization", `Bearer ${mockedLoginResponse.body.token}`).send(mocks_1.mockedProviderUpdate);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH providers/:id - Não deveria poder editar um perfil sem token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const mockedLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const userToPatch = yield (0, supertest_1.default)(app_1.default).get("/providers/");
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/providers/${userToPatch.body[0].id}`).send(mocks_1.mockedProviderUpdate);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH providers/:id - Não deveria poder editar um perfil com id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const mockedLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const userToPatch = yield (0, supertest_1.default)(app_1.default).get("/providers/");
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/providers/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${mockedLoginResponse.body.token}`).send(mocks_1.mockedProviderUpdate);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /providers/:id -  Não deveria conseguir deletar um prestador sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const UserTobeDeleted = yield (0, supertest_1.default)(app_1.default).get("/providers");
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/providers/${UserTobeDeleted.body[0].id}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("DELETE /providers/:id -  Deve conseguir deletar um prestador", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const providerLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const UserTobeDeleted = yield (0, supertest_1.default)(app_1.default).get("/providers");
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/providers/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${providerLoginResponse.body.token}`);
        const findUser = yield (0, supertest_1.default)(app_1.default).get("/providers");
        expect(response.status).toBe(200);
        expect(findUser.body[0].isActive).toBe(false);
    }));
    test("DELETE /providers/:id -  Não deveria deletar um prestador de id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedUserAdm);
        const mockedLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).delete("/providers/13970660-5dbe-423a-9a9d-5c23b37943cf").set("Authorization", `Bearer ${mockedLoginResponse.body.token}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
});
