import { Router } from "express";
import createAddressesController from "../controllers/addresses/createAddresses.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const addressesRoutes = Router()

addressesRoutes.post("",authUserMiddleware,createAddressesController)


export default addressesRoutes