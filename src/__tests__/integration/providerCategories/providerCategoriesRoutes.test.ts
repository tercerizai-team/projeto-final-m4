import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app";
import { mockedCategory, mockedProvider, mockedUserAdm } from "../../mocks";


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

    test("POST /providers/categories - deve conseguir ligar uma categoria a um prestador de serviço", async () => {

        await request(app).post("/users").send(mockedUserAdm)
        await request(app).post("/providers").send(mockedProvider)
        const providerLoginInfo = await request(app).post("/login").send(mockedProvider)
        const admLoginInfo = await request(app).post("/login").send(mockedUserAdm)
        const categoryInfo = await request(app).post("/categories").set("Authorization", `Bearer ${admLoginInfo.body.token}`).send(mockedCategory)
        const response = await request(app).post("/providers/categories").set("Authorization", `Bearer ${providerLoginInfo.body.token}`).send({categoryId: categoryInfo.body.id})

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")

    })

    test("POST /providers/categories - não deveria cadastrar uma categoria com id inválido", async () => {

        const providerLoginInfo = await request(app).post("/login").send(mockedProvider)
        const response = await request(app).post("/providers/categories").set("Authorization", `Bearer ${providerLoginInfo.body.token}`).send({categoryId: "123"})

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")

    })

    test("DELETE /providers/categories/:id - não deveria conseguir remover uma categoria de um prestador sem token", async () => {

        await request(app).post("/login").send(mockedProvider)
        const providerCategoryToDelete = await request(app).get("/providers")
        const response = await request(app).delete(`/providers/categories/${providerCategoryToDelete.body[0].providerCategories[0].category.id}`)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })

    test("DELETE /providers/categories/:id - deve conseguir remover uma categoria de um prestador", async () => {

        const providerLoginInfo = await request(app).post("/login").send(mockedProvider)
        const providerCategoryToDelete = await request(app).get("/providers")
        const response = await request(app).delete(`/providers/categories/${providerCategoryToDelete.body[0].providerCategories[0].category.id}`).set("Authorization", `Bearer ${providerLoginInfo.body.token}`)
        
        expect(response.status).toBe(200)

    })

})
