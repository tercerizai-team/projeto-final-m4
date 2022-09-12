import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedCategory,
  mockedCategoryUpdate,
  mockedProvider,
  mockedProviderLogin,
  mockedProviderPremium,
  mockedProviderTest,
  mockedProviderUpdate,
  mockedProviderWithoutAddress,
  mockedUserAdm,
  mockedUserNotAdm,
} from "../../mocks";
import { string } from "yup";

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

  test("POST categories - Deve conseguir criar uma categoria apenas por um administrador", async () => {
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

    await request(app).post("/users").send(mockedUserNotAdm);
    const responseUser = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
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

  test("PATCH categories - Apenas um administrador pode editar uma categoria", async () => {
    await request(app).post("/users").send(mockedUserAdm);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdm);

    const category = await request(app)
      .patch("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);
      console.log(category.body)

    const responseAdm = await request(app)
      .patch(`/categories/${category.body.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategoryUpdate);

    expect(responseAdm.status).toBe(200);
    expect(responseAdm.body).toHaveProperty("name");
    expect(responseAdm.body.name).toBe(mockedCategoryUpdate.name);
  });

  test("DELETE categories - Apenas um administrador pode deletar uma categoria", async () => {
    await request(app).post("/users").send(mockedUserAdm);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdm);

    const category = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);

    await request(app).post("/users").send(mockedUserAdm);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserNotAdm);

    const responseNotAdm = await request(app)
      .delete(`/categories/${category.body.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    const responseAdm = await request(app)
      .delete(`/categories/${category.body.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(responseNotAdm.status).toBe(400);
    expect(responseNotAdm.body).toHaveProperty("message");
    expect(responseNotAdm.body.message).toBe("Access denied");
    expect(responseAdm.status).toBe(200);
    expect(responseAdm.body).toHaveProperty("message");
    expect(responseAdm.body.message).toBe("Category deleted");
  });
});
