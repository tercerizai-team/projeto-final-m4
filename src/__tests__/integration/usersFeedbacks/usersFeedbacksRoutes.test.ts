import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedCategory,
  mockedCategoryUpdate,
  mockedFeedback,
  mockedProvider,
  mockedProviderLogin,
  mockedUserAdm,
  mockedUserNotAdm,
} from "../../mocks";

describe("/usersFeedbacks", () => {
  let connection: DataSource;

  let admLoginResponse: any;
  let userLoginResponse: any;
  let providerLoginResponse: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserAdm);
    await request(app).post("/users").send(mockedUserNotAdm);
    await request(app).post("/users").send(mockedProvider);

    admLoginResponse = await request(app).post("/login").send(mockedUserAdm);
    userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserNotAdm);
    providerLoginResponse = await request(app)
      .post("/login")
      .send(mockedProviderLogin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST usersFeedbacks - Um provider deve conseguir enviar um feedback a um usuário", async () => {
    const response = request(app)
      .post("/usersFeedbacks")
      .set("Authorization", `Bearer ${providerLoginResponse.body.token}`)
      .send({...mockedFeedback})
  });
});
