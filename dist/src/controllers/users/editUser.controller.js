"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserController = void 0;
const editUser_service_1 = require("../../services/users/editUser.service");
const editUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isAdm = req.userIsAdm;
    const userId = req.userId;
    const { name, email, password, phone } = req.body;
    const userEdit = yield (0, editUser_service_1.editUserService)({ name, email, password, phone }, isAdm, id, userId);
    return res.status(200).send(userEdit);
});
exports.editUserController = editUserController;
