import "express-async-errors";
import "reflect-metadata";
import express from "express";
import usersRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes";
import { handleErrorMiddleware } from "./middlewares/errors.middleware";
import providersRoutes from "./routes/provider.routes";
import usersFeedbacksRoutes from "./routes/usersFeedbacks.routes";
import addressesRoutes from "./routes/addresses.routes";
import categoriesRoutes from "./routes/categories.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes)
app.use("/login", sessionRoutes)
app.use("/usersFeedbacks", usersFeedbacksRoutes)
app.use("/address", addressesRoutes)
app.use("/providers", providersRoutes)
app.use("/categories", categoriesRoutes)

app.use(handleErrorMiddleware);


export default app;
