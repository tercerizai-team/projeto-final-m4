import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app";
import { mockedProvider, mockedProviderSchedule, mockedProviderScheduleNoDay, mockedProviderScheduleUpdate } from "../../mocks";


describe("/users", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /providerSchedule - deve ser capaz de criar um agendamento", async () => {

        await request(app).post("/providers").send(mockedProvider)
        const providerLogin = await request(app).post("/login").send(mockedProvider)
        const response = await request(app).post("/providerSchedule").send(mockedProviderSchedule).set("Authorization", `Bearer ${providerLogin.body.token}`)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")

    })

    test("POST /providerSchedule - não deveria permitir um cadastro sem um dia da semana", async () => {

        const providerLogin = await request(app).post("/login").send(mockedProvider)
        const response = await request(app).post("/providerSchedule").send(mockedProviderScheduleNoDay).set("Authorization", `Bearer ${providerLogin.body.token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")

    })

    test("GET /providerSchedule - deve conseguir listar todas agendas cadastradas para um usuário", async () => {

        const providerLogin = await request(app).post("/login").send(mockedProvider)
        const response = await request(app).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`)

        expect(response.status).toBe(200)

    })

    test("GET /providerSchedule - não deve ser capaz de listar agendas sem token", async () => {

        const response = await request(app).get("/providerSchedule")

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })

    test("PATCH /providerSchedule/:id - deve ser capaz de atualizar uma agenda com os dados corretos", async () => {

        const providerLogin = await request(app).post("/login").send(mockedProvider)
        const providerScheduleInfo = await request(app).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`)
        const response = await request(app).patch(`/providerSchedule/${providerScheduleInfo.body.providerSchedule[0].id}`).set("Authorization", `Bearer ${providerLogin.body.token}`).send(mockedProviderScheduleUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")

    })

    test("PATCH /providerSchedule/:id - não deve ser capaz de atualizar uma agenda com id incorreto", async () => {

        const providerLogin = await request(app).post("/login").send(mockedProvider)
        const providerScheduleInfo = await request(app).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`)
        const response = await request(app).patch("/providerSchedule/123").set("Authorization", `Bearer ${providerLogin.body.token}`).send(mockedProviderScheduleUpdate)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")

    })

    test("DELETE /providerSchedule/:id - deve ser capaz de deletar uma agenda existente", async () => {

        const providerLogin = await request(app).post("/login").send(mockedProvider)
        const providerScheduleToDelete = await request(app).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`)
        const response = await request(app).delete(`/providerSchedule/${providerScheduleToDelete.body.providerSchedule[0].id}`).set("Authorization", `Bearer ${providerLogin.body.token}`).send(mockedProviderScheduleUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")

    })

    test("DELETE /providerSchedule/:id - não deveria ser capaz de deletar uma agenda com id inválido", async () => {

        const providerLogin = await request(app).post("/login").send(mockedProvider)
        const providerScheduleToDelete = await request(app).get("/providerSchedule").set("Authorization", `Bearer ${providerLogin.body.token}`)
        const response = await request(app).delete("/providerSchedule/123").set("Authorization", `Bearer ${providerLogin.body.token}`).send(mockedProviderScheduleUpdate)
        expect(response.status).toBe(404)

    })

})