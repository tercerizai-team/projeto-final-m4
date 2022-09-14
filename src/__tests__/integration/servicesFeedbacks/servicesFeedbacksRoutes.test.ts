import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAddress,
  mockedFeedback,
  mockedProvider,
  mockedProviderLogin,
  mockedSchedule,
  mockedUpdateFeedback,
  mockedUserAdm,
  mockedUserNotAdm,
} from "../../mocks";

describe("/servicesFeedbacks", () => {
  let connection: DataSource;

  let admLoginResponse: any;
  let admId: any;
  let userLoginResponse: any;
  let userId: any;
  let providerLoginResponse: any;
  let providerId: any;
  let feedbackId: any;
  let serviceId: any;

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
    providerId = createProvider.body.id;

    admLoginResponse = await request(app).post("/login").send(mockedUserAdm);
    userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserNotAdm);
    providerLoginResponse = await request(app)
      .post("/login")
      .send(mockedProviderLogin);

    const address = await request(app)
      .post("/address")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockedAddress);

    const schedule = await request(app)
      .post("/schedule")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({
        ...mockedSchedule,
        providerId: providerId,
        addressId: address.body.id,
      });

    const updateSchedule = await request(app)
      .patch(`/schedule/${schedule.body.id}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({ clientConfirmed: true, providerConfirmed: true });

    const service = await request(app)
      .post(`/service`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({ scheduleId: updateSchedule.body.id });

    serviceId = service.body.id;


    const test = await request(app)
      .patch(`/service/${serviceId}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({ isServiceFinished: true, clientFinished: true ,providerFinished: true });

  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST servicesFeedbacks - Um usuário deve conseguir enviar um feedback a um serviço", async () => {
    const response = await request(app)
      .post("/servicesFeedbacks")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({ ...mockedFeedback, providerId, serviceId });

    feedbackId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("note");
    expect(response.body.comment).toBe(mockedFeedback.comment);
  });

  test("POST servicesFeedbacks - Um usuário não deve conseguir enviar mais que um feedback a um serviço", async () => {
    const response = await request(app)
      .post("/servicesFeedbacks")
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send({ ...mockedFeedback, providerId, serviceId });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST servicesFeedbacks - Usuário não relacionado com a schedule não deve conseguir enviar um feedback ao um service", async () => {
    const response = await request(app)
      .post("/servicesFeedbacks")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ ...mockedFeedback, providerId, serviceId });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("GET servicesFeedbacks - Um usuário logado deve ser capaz de ver os feedbacks do provider", async () => {
    const response = await request(app)
      .get(`/servicesFeedbacks/${providerId}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body[0].note).toBe(mockedFeedback.note);
  });

  test("PATCH servicesFeedbacks - Um usuário não pode editar um feedback", async () => {
    const response = await request(app)
      .patch(`/servicesFeedbacks/${feedbackId}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedUpdateFeedback);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH servicesFeedbacks - Um administrador deve poder editar um feedback", async () => {
    const response = await request(app)
      .patch(`/servicesFeedbacks/${feedbackId}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`)
      .send(mockedUpdateFeedback);

    expect(response.status).toBe(200);
    expect(response.body.note).toBe(mockedUpdateFeedback.note);
  });

  test("DELETE servicesFeedbacks - Um usuário ou provider não podem deletar um feedback", async () => {
    const response = await request(app)
      .delete(`/servicesFeedbacks/${feedbackId}`)
      .set("Authorization", `Bearer ${providerLoginResponse.body.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE servicesFeedbacks - Um administrador deve poder deletar um feedback", async () => {
    const response = await request(app)
      .delete(`/servicesFeedbacks/${feedbackId}`)
      .set("Authorization", `Bearer ${admLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
