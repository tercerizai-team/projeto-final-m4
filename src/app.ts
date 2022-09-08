import "express-async-errors"
import "reflect-metadata"
import express from "express";
import usersRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes"
import { handleErrorMiddleware } from "./middlewares/errors.middleware";
import usersFeedbacksRoutes from "./routes/usersFeedbacks.routes";


const app = express()
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/login", sessionRoutes)
app.use("/usersFeedbacks", usersFeedbacksRoutes)

app.use(handleErrorMiddleware)

export default app