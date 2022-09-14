import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedCategory,
  mockedCategoryUpdate,
  mockedUserAdm,
  mockedUserNotAdm,
} from "../../mocks";

describe("/categories", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST categories - Um administrador deve conseguir criar uma categoria", async () => {
    await request(app).post("/users").send(mockedUserAdm);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdm);
    const responseAdm = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);

    expect(responseAdm.status).toBe(201);
    expect(responseAdm.body).toHaveProperty("id");
  });

  test("POST categories - Um usuário normal não deve conseguir criar uma categoria", async () => {
    await request(app).post("/users").send(mockedUserNotAdm);
    const notAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdm);
    const responseUser = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)
      .send(mockedCategory);

    expect(responseUser.status).toBe(400);
    expect(responseUser.body).toHaveProperty("message");
  });

  test("GET categories - Deve conseguir listar todas as categorias", async () => {
    await request(app).post("/users").send(mockedUserAdm);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdm);
    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);
    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("name");
  });

  test("PATCH categories - Um administrador deve poder editar uma categoria", async () => {
    await request(app).post("/users").send(mockedUserAdm);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdm);

    const category = await request(app)
      .get("/categories")

    const responseAdm = await request(app)
      .patch(`/categories/${category.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategoryUpdate);

    expect(responseAdm.status).toBe(200);
    expect(responseAdm.body).toHaveProperty("message")
  });

  test("PATCH categories - Um usuário normal não deve poder editar uma categoria", async () => {
    await request(app).post("/users").send(mockedUserNotAdm);
    const notAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdm);

    const category = await request(app)
      .get("/categories")

    const responseNotAdm = await request(app)
      .patch(`/categories/${category.body[0].id}`)
      .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)
      .send(mockedCategoryUpdate);

    expect(responseNotAdm.status).toBe(400);
    expect(responseNotAdm.body).toHaveProperty("message");
  });

  test("GET category - Deve ser possível listar os usuários que possuem a categoria passada como parâmetro", async () => {
    const category = await request(app)
      .get("/categories")
    
    const response = await request(app).get(`/categories/${category.body[0].id}`)

    expect(response.status).toBe(200)
    expect(response.body).not.toHaveProperty("message")
  })

  test("DELETE categories - Um usuário normal não deve poder deletar uma categoria", async () => {
    const category = await request(app)
      .get("/categories")

    await request(app).post("/users").send(mockedUserNotAdm);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserNotAdm);

    const responseNotAdm = await request(app)
      .delete(`/categories/${category.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(responseNotAdm.status).toBe(401);
    expect(responseNotAdm.body).toHaveProperty("message");
    expect(responseNotAdm.body.message).toBe("Access denied");
  });

  test("DELETE categories - Um administrador deve poder deletar uma categoria", async () => {
    await request(app).post("/users").send(mockedUserAdm);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdm);

    const category = await request(app)
      .get("/categories")

    const responseAdm = await request(app)
      .delete(`/categories/${category.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(responseAdm.status).toBe(200);
    expect(responseAdm.body).toHaveProperty("message");
    expect(responseAdm.body.message).toBe("Category deleted");
  });
});
