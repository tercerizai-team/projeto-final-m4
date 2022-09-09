import { Router } from "express";
import createAddressesController from "../controllers/addresses/createAddresses.controller";
import updateAddressController from "../controllers/addresses/updateAddress.controller";
import getAddressController from "../controllers/addresses/getAddresses.controler";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { isTheOwnerOrAdmMiddleware } from "../middlewares/isTheOwnerOrAdm.middleware";
import { deleteAddressController } from "../controllers/addresses/deleteAddress.controller";



const addressesRoutes = Router();

addressesRoutes.post("", authUserMiddleware, createAddressesController);
addressesRoutes.delete("/:id", authUserMiddleware, deleteAddressController);
addressesRoutes.get("/:id", authUserMiddleware, getAddressController);
addressesRoutes.patch("/:id", authUserMiddleware, updateAddressController)

export default addressesRoutes;
