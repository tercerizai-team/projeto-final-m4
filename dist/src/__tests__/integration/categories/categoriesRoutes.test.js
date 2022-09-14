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
describe("/categories", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST categories - Um administrador deve conseguir criar uma categoria", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedUserAdm);
        const responseAdm = yield (0, supertest_1.default)(app_1.default)
            .post("/categories")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mocks_1.mockedCategory);
        expect(responseAdm.status).toBe(201);
        expect(responseAdm.body).toHaveProperty("id");
    }));
    test("POST categories - Um usuário normal não deve conseguir criar uma categoria", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const notAdminLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedUserAdm);
        const responseUser = yield (0, supertest_1.default)(app_1.default)
            .post("/categories")
            .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)
            .send(mocks_1.mockedCategory);
        expect(responseUser.status).toBe(400);
        expect(responseUser.body).toHaveProperty("message");
    }));
    test("GET categories - Deve conseguir listar todas as categorias", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedUserAdm);
        yield (0, supertest_1.default)(app_1.default)
            .post("/categories")
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mocks_1.mockedCategory);
        const response = yield (0, supertest_1.default)(app_1.default).get("/categories");
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("name");
    }));
    test("PATCH categories - Um administrador deve poder editar uma categoria", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedUserAdm);
        const category = yield (0, supertest_1.default)(app_1.default)
            .get("/categories");
        const responseAdm = yield (0, supertest_1.default)(app_1.default)
            .patch(`/categories/${category.body[0].id}`)
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
            .send(mocks_1.mockedCategoryUpdate);
        expect(responseAdm.status).toBe(200);
        expect(responseAdm.body).toHaveProperty("message");
    }));
    test("PATCH categories - Um usuário normal não deve poder editar uma categoria", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const notAdminLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedUserAdm);
        const category = yield (0, supertest_1.default)(app_1.default)
            .get("/categories");
        const responseNotAdm = yield (0, supertest_1.default)(app_1.default)
            .patch(`/categories/${category.body[0].id}`)
            .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)
            .send(mocks_1.mockedCategoryUpdate);
        expect(responseNotAdm.status).toBe(400);
        expect(responseNotAdm.body).toHaveProperty("message");
    }));
    test("GET category - Deve ser possível listar os usuários que possuem a categoria passada como parâmetro", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield (0, supertest_1.default)(app_1.default)
            .get("/categories");
        const response = yield (0, supertest_1.default)(app_1.default).get(`/categories/${category.body[0].id}`);
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty("message");
    }));
    test("DELETE categories - Um usuário normal não deve poder deletar uma categoria", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield (0, supertest_1.default)(app_1.default)
            .get("/categories");
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserNotAdm);
        const userLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedUserNotAdm);
        const responseNotAdm = yield (0, supertest_1.default)(app_1.default)
            .delete(`/categories/${category.body[0].id}`)
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
        expect(responseNotAdm.status).toBe(401);
        expect(responseNotAdm.body).toHaveProperty("message");
        expect(responseNotAdm.body.message).toBe("Access denied");
    }));
    test("DELETE categories - Um administrador deve poder deletar uma categoria", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        const adminLoginResponse = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedUserAdm);
        const category = yield (0, supertest_1.default)(app_1.default)
            .get("/categories");
        const responseAdm = yield (0, supertest_1.default)(app_1.default)
            .delete(`/categories/${category.body[0].id}`)
            .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
        expect(responseAdm.status).toBe(200);
        expect(responseAdm.body).toHaveProperty("message");
        expect(responseAdm.body.message).toBe("Category deleted");
    }));
});
