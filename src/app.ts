import "express-async-errors"
import "reflect-metadata"
import express from "express";
import usersRoutes from "./routes/users.routes";
import { handleErrorMiddleware } from "./middlewares/errors.middleware";


const app = express()
app.use(express.json())

app.use("/users", usersRoutes)

app.use(handleErrorMiddleware)

export default app