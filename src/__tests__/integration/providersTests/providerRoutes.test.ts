import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedProvider, mockedProviderLogin, mockedProviderPremium, mockedProviderTest, mockedProviderUpdate, mockedProviderWithoutAddress, mockedUserAdm } from "../../mocks";


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


    test("GET providers - Deve ser capaz de listar todos os prestadores registrados", async () => {

        await request(app).post("/providers").send(mockedProvider)
        await request(app).post("/providers").send(mockedProviderTest)
        const adminLoginResponse = await request(app).post("/login").send(mockedProvider);
        const response = await request(app).get("/providers").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)

    })

    test("GET providers - Deve ser capaz de listar todos os prestadores registrados sem token", async () => {

        await request(app).post("/providers").send(mockedProvider)
        const response = await request(app).get("/providers")
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)

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

    })

    test("GET providers/:id - Não deveria ser capaz de listar perfil com o token inválido", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        await request(app).post("/providers").send(mockedProviderTest)
        await request(app).post("/providers").send(mockedProvider)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const providerOne = await request(app).get("/providers").send(adminLoginResponse.body.token)
        const providerTwoResponse = await request(app).post("/login").send(mockedProviderTest)
        const response = await request(app).get(`/providers/${providerOne.body[0].id}`).set("Authorization",`Bearer ${providerTwoResponse.body.token}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })

    test("GET providers/:id - Adm deve ser capaz de listar perfil que não é o seu próprio", async () => {

        await request(app).post("/providers").send(mockedProvider)
        await request(app).post("/users").send(mockedUserAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const providerOne = await request(app).get("/providers")
        const response = await request(app).get(`/providers/${providerOne.body[0].id}`).set("Authorization",`Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("address")
        expect(response.body).toHaveProperty("schedules")

    })

    test("PATCH providers/:id - Adm deve ser capaz de editar um prestador de serviço", async () => {

        await request(app).post("/providers").send(mockedProvider)
        await request(app).post("/users").send(mockedUserAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const userToPatch = await request(app).get("/providers/")
        const response = await request(app).patch(`/providers/${userToPatch.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedProviderUpdate) 

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("name")
        expect(response.body.name).toBe("jorgin")

    })

    test("PATCH providers/:id - Dono do perfil deve ser capaz de editar seu próprio perfil", async () => {

        await request(app).post("/providers").send(mockedProvider)
        const mockedLoginResponse = await request(app).post("/login").send(mockedProvider)
        const userToPatch = await request(app).get("/providers/")
        const response = await request(app).patch(`/providers/${userToPatch.body[0].id}`).set("Authorization", `Bearer ${mockedLoginResponse.body.token}`).send(mockedProviderUpdate) 

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("name")
        expect(response.body.name).toBe("jorgin")

    })

    test("PATCH providers/:id - Um prestador não deve ser capaz de editar o perfil de outro", async () => {

        await request(app).post("/providers").send(mockedProviderTest)
        await request(app).post("/providers").send(mockedProvider)
        const mockedLoginResponse = await request(app).post("/login").send(mockedProvider)
        const userToPatch = await request(app).get("/providers/")
        const response = await request(app).patch(`/providers/${userToPatch.body[1].id}`).set("Authorization", `Bearer ${mockedLoginResponse.body.token}`).send(mockedProviderUpdate) 

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })

    test("PATCH providers/:id - Não deveria poder editar um perfil sem token", async () => {

        await request(app).post("/providers").send(mockedProvider)
        const mockedLoginResponse = await request(app).post("/login").send(mockedProvider)
        const userToPatch = await request(app).get("/providers/")
        const response = await request(app).patch(`/providers/${userToPatch.body[0].id}`).send(mockedProviderUpdate) 

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })

    test("PATCH providers/:id - Não deveria poder editar um perfil com id inválido", async () => {

        await request(app).post("/providers").send(mockedProvider)
        const mockedLoginResponse = await request(app).post("/login").send(mockedProvider)
        const userToPatch = await request(app).get("/providers/")
        const response = await request(app).patch(`/providers/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${mockedLoginResponse.body.token}`).send(mockedProviderUpdate) 

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })

    test("DELETE /providers/:id -  Não deveria conseguir deletar um prestador sem autenticação", async () => {

        await request(app).post("/login").send(mockedProvider);
        const UserTobeDeleted = await request(app).get("/providers")
        const response = await request(app).delete(`/providers/${UserTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("DELETE /providers/:id -  Deve conseguir deletar um prestador", async () => {

        await request(app).post("/providers").send(mockedProvider)
        const providerLoginResponse = await request(app).post("/login").send(mockedProvider);
        const UserTobeDeleted = await request(app).get("/providers")
        const response = await request(app).delete(`/providers/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${providerLoginResponse.body.token}`)
        const findUser = await request(app).get("/providers")

        expect(response.status).toBe(200)
        expect(findUser.body[0].isActive).toBe(false)
     
    })

    test("DELETE /providers/:id -  Não deveria deletar um prestador de id inválido", async () => {

        await request(app).post("/providers").send(mockedUserAdm)
        const mockedLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const response = await request(app).delete("/providers/13970660-5dbe-423a-9a9d-5c23b37943cf").set("Authorization", `Bearer ${mockedLoginResponse.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

})