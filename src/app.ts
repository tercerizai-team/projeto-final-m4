import express, { Request, Response, NextFunction } from "express";
import usersRoutes from "./routes/users.routes";

import { AppError } from "./errors/AppError";

const app = express()

app.use(express.json())

app.use("/users", usersRoutes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }
})

export default app