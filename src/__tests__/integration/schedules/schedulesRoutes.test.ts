import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedAddress, mockedProvider, mockedSchedule, mockedScheduleUpdate, mockedUserAdm, mockedUserNotAdm } from "../../mocks";


describe("/providers", () => {
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

    test("POST /schedule - deve ser capaz de criar um novo agendamento", async () => {

        const user = await request(app).post("/users").send(mockedUserNotAdm)
        const provider = await request(app).post("/providers").send(mockedProvider)
        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        const addressInfo = await request(app).post("/address").set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedAddress)
        mockedSchedule.providerId = provider.body.id
        mockedSchedule.addressId = addressInfo.body.id
        const response = await request(app).post("/schedule").set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedSchedule)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")

    })

    test("POST /schedule - Não deveria ser capaz de criar um agendamento sem id do prestador de serviços", async () => {

        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        const addressInfo = await request(app).post("/address").set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedAddress)
        mockedSchedule.providerId = ""
        mockedSchedule.addressId = addressInfo.body.id
        const response = await request(app).post("/schedule").set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedSchedule)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")

    })


    test("GET /schedule/:id - deve conseguir listar os agendamentos de um usuário", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        const admLoginInfo = await request(app).post("/login").send(mockedUserAdm)
        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        const userInfo = await request(app).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`)
        const response = await request(app).get(`/schedule/${userInfo.body[0].schedules[0].id}`).set("Authorization", `Bearer ${userLogin.body.token}`)

        expect(response.status).toBe(200)
        
    })

    test("GET /schedule/:id - não deve conseguir listar um usuário sem um token de acesso", async () => {

        const admLoginInfo = await request(app).post("/login").send(mockedUserAdm)
        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        const userInfo = await request(app).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`)
        const response = await request(app).get(`/schedule/${userInfo.body[0].schedules[0].id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
        
    })

    test("PATCH /schedule/:id - deve conseguir atualizar um agendamento de um usuário", async () => {

        const admLoginInfo = await request(app).post("/login").send(mockedUserAdm)
        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        const userInfo = await request(app).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`)
        const response = await request(app).patch(`/schedule/${userInfo.body[0].schedules[0].id}`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedScheduleUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        
    })

    test("PATCH /schedule/:id - não deveria conseguir editar um agendamento de id inválido", async () => {

        const admLoginInfo = await request(app).post("/login").send(mockedUserAdm)
        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        const userInfo = await request(app).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`)
        const response = await request(app).patch("/schedule/123").set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedScheduleUpdate)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
        
    })

    test("DELETE /schedule/:id - deve conseguir deletar um agendamento de usuário já existente", async () => {

        const admLoginInfo = await request(app).post("/login").send(mockedUserAdm)
        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        const userInfo = await request(app).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`)
        const response = await request(app).delete(`/schedule/${userInfo.body[0].schedules[0].id}`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedScheduleUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
        
    })


    test("DELETE /schedule/:id - não deveria conseguir deletar um agendamento de id inválido", async () => {

        const admLoginInfo = await request(app).post("/login").send(mockedUserAdm)
        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        const userInfo = await request(app).get("/users").set("Authorization", `Bearer ${admLoginInfo.body.token}`)
        const response = await request(app).delete("/schedule/123").set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedScheduleUpdate)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
        
    })



})
