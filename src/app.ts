import "express-async-errors"
import "reflect-metadata"
import express from "express";
import usersRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes"
import providersRoutes from "./routes/providers.routes"
import { handleErrorMiddleware } from "./middlewares/errors.middleware";


const app = express()
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/login", sessionRoutes)
app.use("/providers", providersRoutes)

app.use(handleErrorMiddleware)

export default app