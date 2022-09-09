import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedUserAdm, mockedUserNotAdm, mockedUserUpdate } from "../../mocks";


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

    test("/POST users -  deve ser capaz de criar um usuário 201", async () => {

        const response = await request(app).post("/users").send(mockedUserNotAdm)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("isAdm")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body.name).toEqual("Jorgin")
        expect(response.body.email).toEqual("jorgin@mail.com")
        expect(response.body.isAdm).toEqual(false)
        expect(response.body.isActive).toEqual(true)
        expect(response.status).toBe(201)   

    })


    test("POST /users -  não deveria criar um usuário que já existe", async () => {

        const response = await request(app).post('/users').send(mockedUserNotAdm)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
             
    })

    test("GET /users -  Deve conseguir listar todos os usuários criados", async () => {
        await request(app).post('/users').send(mockedUserAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm);
        const response = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveLength(2)
     
    })

    test("GET /users - Não deveria conseguir listar usuários sem ser um administrador", async () => {

        await request(app).post("/users").send(mockedUserNotAdm)
        const notAdmLoginResponse = await request(app).post("/login").send(mockedUserNotAdm)
        const response = await request(app).get("/users").set("Authorization", `Bearer ${notAdmLoginResponse.body.token}`)

        expect(response.status).toBe(401 || 403 || 400)
        expect(response.body).toHaveProperty("message")

    })

    test("GET /users -  Não deveria conseguir deletar um usuário sem ser um administrador", async () => {

        const userLoginResponse = await request(app).post("/login").send(mockedUserNotAdm);
        const response = await request(app).get('/users')

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("DELETE /users/:id -  Não deveria conseguir deletar um usuário sem autenticação", async () => {
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("DELETE /users/:id -  Deve conseguir deletar um usuário", async () => {
        await request(app).post('/users').send(mockedUserAdm)

        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const findUser = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(200)
        expect(findUser.body[0].isActive).toBe(false)
     
    })

    test("DELETE /users/:id -  Não deveria deletar um usuário que já esta inativo", async () => {
        await request(app).post('/users').send(mockedUserAdm)

        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm);
        const UserTobeDeleted = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${UserTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
     
    })

    test("DELETE -  Não deveria deletar um usuário de id inválido", async () => {
        await request(app).post('/users').send(mockedUserAdm)

        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm);
        
        const response = await request(app).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

    test("PATCH /users/:id - Deve conseguir editar um usuário já existente", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const userToPatch = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const response = await request(app).patch(`/users/${userToPatch.body[0].id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedUserUpdate)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("name")
        expect(response.body.name).toBe("Mateus")

    })

    test("PATCH /users/:id - Não deveria editar um usuário sem autenticação", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const userToPatch = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const response = await request(app).patch(`/users/${userToPatch.body[0].id}`).send(mockedUserUpdate)

        expect(response.status).toBe(401 || 400 || 403)
        expect(response.body).toHaveProperty("message")

    })

    test("PATCH /users/:id - Não deveria dar update em um usuário que não existe", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserAdm)
        const userToPatch = await request(app).get('/users').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const response = await request(app).patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedUserUpdate)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")

    })

})