import "express-async-errors";
import "reflect-metadata";
import express from "express";
import usersRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes";
import { handleErrorMiddleware } from "./middlewares/errors.middleware";
import providersRouter from "./routes/providers.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", sessionRoutes);
app.use("/provider", providersRouter);

app.use(handleErrorMiddleware);

export default app;
