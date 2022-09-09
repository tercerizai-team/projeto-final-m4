import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedProvider, mockedProviderPremium, mockedProviderTest, mockedProviderWithoutAddress, mockedUserAdm } from "../../mocks";


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

    test("POST providers - Deve conseguir cadastrar um prestador de serviço", async () => {

        const response = await request(app).post("/providers").send(mockedProvider)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("address")
        expect(response.body.isPremium).toBe(false)

    })

    test("POST providers - Não deveria conseguir cadastrar um prestador sem endereço", async () => {

        const response = await request(app).post("/providers").send(mockedProviderWithoutAddress)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")

    })


    test("POST providers - Não deveria conseguir cadastrar um prestador sendo premium isPremium === true", async () => {

        const response = await request(app).post("/providers").send(mockedProviderPremium)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBe("isPremium cannot be true at the register moment")

    })

    test("GET providers - Deve ser capaz de listar todos os prestadores registrados", async () => {

        await request(app).post("/providers").send(mockedProvider)
        await request(app).post("/providers").send(mockedProviderTest)
        const adminLoginResponse = await request(app).post("/login").send(mockedProvider);
        const response = await request(app).get("/providers").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)

    })

    test("GET providers - Não deveria ser capaz de listar prestadores sem autenticação", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        const response = await request(app).get("/providers")

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })

    test("GET providers/:id - Deve ser capaz de listar o perfil do prestador como dono do perfil", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        await request(app).post("/providers").send(mockedProvider)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const providerLoginResponse = await request(app).post("/login").send(mockedProvider)
        const providerOne = await request(app).get("/providers").send(adminLoginResponse.body.token)
        const response = await request(app).get(`/providers/${providerOne.body[0].id}`).set("Authorization", `Bearer ${providerLoginResponse.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("schedules")
        expect(response.body).toHaveProperty("categories")

    })

    test("GET providers/:id - Não deveria ser capaz de listar perfil com o token inválido", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        await request(app).post("/providers").send(mockedProviderTest)
        await request(app).post("/providers").send(mockedProvider)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const providerOne = await request(app).get("/providers").send(adminLoginResponse.body.token)
        const providerTwoResponse = await request(app).post("/login").send(mockedProviderTest)
        const response = await request(app).get(`/providers/${providerOne.body[0].id}`).send(providerTwoResponse.body.token)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })

    test("GET providers/:id - Adm deve ser capaz de listar perfil que não é o seu próprio", async () => {

        await request(app).post("/providers").send(mockedProvider)
        await request(app).post("/users").send(mockedUserAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const providerOne = await request(app).get("/providers").send(adminLoginResponse.body.token)
        const response = await request(app).get(`/providers/${providerOne.body[0].id}`).send(adminLoginResponse.body.token)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("schedules")
        expect(response.body).toHaveProperty("categories")

    })

})