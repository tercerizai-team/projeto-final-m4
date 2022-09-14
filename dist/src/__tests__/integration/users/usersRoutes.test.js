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
    test("/POST users -  deve ser capaz de criar um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("isAdm");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body.name).toEqual("Jorgin");
        expect(response.body.email).toEqual("jorgin@mail.com");
        expect(response.body.isAdm).toEqual(false);
        expect(response.body.isActive).toEqual(true);
        expect(response.status).toBe(201);
    }));
    test("POST /users -  não deveria criar um usuário que já existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUserNotAdm);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    }));
    test("GET /users -  Deve conseguir listar todos os usuários criados", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.body).toHaveLength(2);
    }));
    test("GET /users - Não deveria conseguir listar usuários sem ser um administrador", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const notAdmLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const response = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${notAdmLoginResponse.body.token}`);
        expect(response.status).toBe(401 || 403 || 400);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /users -  Não deveria conseguir deletar um usuário sem ser um administrador", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserNotAdm);
        const response = yield (0, supertest_1.default)(app_1.default).get('/users');
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("DELETE /users/:id -  Não deveria conseguir deletar um usuário sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const UserTobeDeleted = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/${UserTobeDeleted.body[0].id}`);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    }));
    test("DELETE /users/:id -  Deve conseguir deletar um usuário", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const UserTobeDeleted = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const findUser = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(200);
        expect(findUser.body[0].isActive).toBe(false);
    }));
    test("DELETE /users/:id -  Não deveria deletar um usuário que já esta inativo", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const UserTobeDeleted = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE -  Não deveria deletar um usuário de id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post('/users').send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /users/:id - Deve conseguir editar um usuário já existente", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userToPatch = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/${userToPatch.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedUserUpdate);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).toHaveProperty("name");
        expect(response.body.name).toBe("Mateus");
    }));
    test("PATCH /users/:id - Não deveria editar um usuário sem autenticação", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userToPatch = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/${userToPatch.body[0].id}`).send(mocks_1.mockedUserUpdate);
        expect(response.status).toBe(401 || 400 || 403);
        expect(response.body).toHaveProperty("message");
    }));
    test("PATCH /users/:id - Não deveria dar update em um usuário que não existe", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const userToPatch = yield (0, supertest_1.default)(app_1.default).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default).patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mocks_1.mockedUserUpdate);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
});
