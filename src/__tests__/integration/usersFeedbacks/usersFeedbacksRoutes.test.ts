import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedFeedback,
  mockedProvider,
  mockedProviderLogin,
  mockedUpdateFeedback,
  mockedUserAdm,
  mockedUserNotAdm,
} from "../../mocks";

describe("/usersFeedbacks", () => {
  let connection: DataSource;

  let admLoginResponse: any;
  let admId: any;
  let userLoginResponse: any;
  let userId: any;
  let providerLoginResponse: any;
  let feedbackId: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const createUserAdm = await request(app).post("/users").send(mockedUserAdm);
    const createUser = await request(app).post("/users").send(mockedUserNotAdm);
    const createProvider = await request(app)
      .post("/providers")
      .send(mockedProvider);
    admId = createUserAdm.body.id;
    userId = createUser.body.id;

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
    const response = await request(app)
      .post("/usersFeedbacks")
      .set("Authorization", `Bearer ${providerLoginResponse.body.token}`)
      .send({ ...mockedFeedback, userId: admId });

    feedbackId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("note");
    expect(response.body.comment).toBe(mockedFeedback.comment);
  });

  test("POST usersFeedbacks - Um provider não deve conseguir enviar mais de um feedback a um usuário", async () => {
    const response = await request(app)
      .post("/usersFeedbacks")
      .set("Authorization", `Bearer ${providerLoginResponse.body.token}`)
      .send({ ...mockedFeedback, userId: admId });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST usersFeedbacks - User não deve conseguir enviar um feedback a um usuário", async () => {
    const response = await request(app)
      .post("/usersFeedbacks")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ ...mockedFeedback, admId });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("GET usersFeedbacks - Um usuário logado deve ser capaz de ver os feedbacks de outro user", async () => {
    const response = await request(app)
      .get(`/usersFeedbacks/${admId}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body[0].note).toBe(mockedFeedback.note);
  });

  test("PATCH usersFeedbacks - Um provider não pode editar um feedback", async () => {
    const response = await request(app)
      .patch(`/usersFeedbacks/${feedbackId}`)
      .set("Authorization", `Bearer ${providerLoginResponse.body.token}`)
      .send(mockedUpdateFeedback);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH usersFeedbacks - Um administrador deve poder editar um feedback", async () => {
    const response = await request(app)
      .patch(`/usersFeedbacks/${feedbackId}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockedUpdateFeedback);

    expect(response.status).toBe(200);
    expect(response.body.note).toBe(mockedUpdateFeedback.note);
  });

  test("DELETE usersFeedbacks - Um usuário ou provider não podem deletar um feedback", async () => {
    const response = await request(app)
      .delete(`/usersFeedbacks/${feedbackId}`)
      .set("Authorization", `Bearer ${providerLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE usersFeedbacks - Um administrador deve poder deletar um feedback", async () => {
    const response = await request(app)
      .delete(`/usersFeedbacks/${feedbackId}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
