import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedProvider, mockedProviderPremium, mockedProviderWithoutAddress } from "../../mocks";


describe("/provider", () => {
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

    test("/POST providers - Deve conseguir cadastrar um prestador de serviço", async () => {

        const response = await request(app).post("/providers").send(mockedProvider)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("address")
        expect(response.body.isPremium).toBe(false)

    })

    test("/POST providers - Não deveria conseguir cadastrar um prestador sem endereço", async () => {

        const response = await request(app).post("/providers").send(mockedProviderWithoutAddress)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")

    })


    test("/POST providers - Não deveria conseguir cadastrar um prestador sendo premium isPremium === true", async () => {

        const response = await request(app).post("/providers").send(mockedProviderPremium)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toBe("isPremium cannot be true at the register moment")

    })

})