import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedAddress, mockedAddressNoZip, mockedUserAdm, mockedUserNotAdm } from "../../mocks";


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

    test("POST /address - deve ser capaz de cadastrar um novo endereço", async () => {


        await request(app).post("/users").send(mockedUserNotAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserNotAdm);
        const response = await request(app).post("/address").send(mockedAddress).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")

    })

    test("POST /address - não deve ser capaz de cadastrar um endereço repetido", async () => {

        await request(app).post("/users").send(mockedUserNotAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserNotAdm);
        await request(app).post("/address").send(mockedAddress).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const response = await request(app).post("/address").send(mockedAddress).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")

    })

    test("POST /address - não deve ser capaz de cadastrar um endereço sem zipCode", async () => {

        await request(app).post("/users").send(mockedUserNotAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedUserNotAdm);
        const response = await request(app).post("/address").send(mockedAddressNoZip).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")

    })

    test("GET /address - usuário deve ser capaz de listar todos os seus endereços existentes", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        const userLoginResponse = await request(app).post("/login").send(mockedUserAdm);
        const response = await request(app).get("/address").set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")

    })

    test("GET /address - usuário não deve conseguir listar endereços sem autenticação", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        const userLoginResponse = await request(app).post("/login").send(mockedUserAdm);
        const response = await request(app).get("/address")

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })

    test("DELETE /address - usuário deve conseguir deletar um endereço", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        const userLoginResponse = await request(app).post("/login").send(mockedUserAdm);
        const user = await request(app).get("/users").set("Authorization", `Bearer ${userLoginResponse.body.token}`)
        const newAddress = await request(app).post("/address").send(mockedAddress).set("Authorization", `Bearer ${userLoginResponse.body.token}`)
        const usersAdresses = await request(app).delete("")
    })

})