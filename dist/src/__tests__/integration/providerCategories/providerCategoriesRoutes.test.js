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
    test("POST /providers/categories - deve conseguir ligar uma categoria a um prestador de serviço", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserAdm);
        yield (0, supertest_1.default)(app_1.default).post("/providers").send(mocks_1.mockedProvider);
        const providerLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const admLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserAdm);
        const categoryInfo = yield (0, supertest_1.default)(app_1.default).post("/categories").set("Authorization", `Bearer ${admLoginInfo.body.token}`).send(mocks_1.mockedCategory);
        const response = yield (0, supertest_1.default)(app_1.default).post("/providers/categories").set("Authorization", `Bearer ${providerLoginInfo.body.token}`).send({ categoryId: categoryInfo.body.id });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    }));
    test("POST /providers/categories - não deveria cadastrar uma categoria com id inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        const providerLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const response = yield (0, supertest_1.default)(app_1.default).post("/providers/categories").set("Authorization", `Bearer ${providerLoginInfo.body.token}`).send({ categoryId: "123" });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /providers/categories/:id - não deveria conseguir remover uma categoria de um prestador sem token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const providerCategoryToDelete = yield (0, supertest_1.default)(app_1.default).get("/providers");
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/providers/categories/${providerCategoryToDelete.body[0].providerCategories[0].category.id}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("DELETE /providers/categories/:id - deve conseguir remover uma categoria de um prestador", () => __awaiter(void 0, void 0, void 0, function* () {
        const providerLoginInfo = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedProvider);
        const providerCategoryToDelete = yield (0, supertest_1.default)(app_1.default).get("/providers");
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/providers/categories/${providerCategoryToDelete.body[0].providerCategories[0].category.id}`).set("Authorization", `Bearer ${providerLoginInfo.body.token}`);
        expect(response.status).toBe(200);
    }));
});
