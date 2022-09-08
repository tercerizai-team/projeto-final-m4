import { Router } from "express";
import createAddressesController from "../controllers/addresses/createAddresses.controller";
import updateAddressController from "../controllers/addresses/updateAddress.controller";
import getAddressController from "../controllers/addresses/getAddresses.controler";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";

const addressesRoutes = Router();

addressesRoutes.post("",authUserMiddleware,createAddressesController)
addressesRoutes.patch("/:id", authUserMiddleware, updateAddressController)
addressesRoutes.get(
  "/:id",
  authUserMiddleware,
  getAddressController
);

export default addressesRoutes;
