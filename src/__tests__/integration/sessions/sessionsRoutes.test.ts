import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app";
import { mockedUser, mockedUserAdm, mockedUserLogin, mockedUserNotAdm } from "../../mocks";


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

    test("POST /login - Usuário deve conseguir logar com uma conta existente", async () => {

        const user = await request(app).post("/users").send(mockedUser)
        console.log(user.body)
        const response = await request(app).post("/login").send(mockedUser)
        console.log(response.body)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")

    })

    test("POST /login - usuário não deveria conseguir logar com e-mail ou senha incorretos", async () => {

        const response = await request(app).post("/login").send(mockedUserLogin)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")

    })

})