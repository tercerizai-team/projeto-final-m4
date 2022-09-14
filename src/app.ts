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
import servicesFeedbacksRoutes from "./routes/servicesFeedbacks.routes";
import scheduleRoutes from "./routes/schedule.routes";
import providerSchedulesRoutes from "./routes/providersSchedules.routes";
import servicesRoutes from "./routes/service.routes";
import providerCategoryRoutes from "./routes/providerCategory.routes";
import cors from "cors"

const app = express();
app.use(express.json());

app.use("/users", cors(), usersRoutes);
app.use("/login", cors(), sessionRoutes);
app.use("/usersFeedbacks", cors(), usersFeedbacksRoutes);
app.use("/address", cors(), addressesRoutes);
app.use("/providers", cors(), providersRoutes);
app.use("/categories", cors(), categoriesRoutes);
app.use("/schedule", cors(), scheduleRoutes);
app.use("/servicesFeedbacks", cors(), servicesFeedbacksRoutes);
app.use("/providerSchedule", cors(), providerSchedulesRoutes);
app.use("/service", cors(), servicesRoutes);
app.use("/providers", cors(), providerCategoryRoutes);

app.use(handleErrorMiddleware);

export default app;
