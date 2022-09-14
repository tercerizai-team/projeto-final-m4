"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createCategory_controller_1 = require("../controllers/categories/createCategory.controller");
const deleteCategory_controller_1 = require("../controllers/categories/deleteCategory.controller");
const editCategory_controller_1 = require("../controllers/categories/editCategory.controller");
const getCategory_controller_1 = require("../controllers/categories/getCategory.controller");
const listCategories_controller_1 = require("../controllers/categories/listCategories.controller");
const authUser_middleware_1 = require("../middlewares/authUser.middleware");
const isAdm_middleware_1 = require("../middlewares/isAdm.middleware");
const categoriesRoutes = (0, express_1.Router)();
categoriesRoutes.post("", authUser_middleware_1.authUserMiddleware, isAdm_middleware_1.isAdmMiddleware, createCategory_controller_1.createCategoryController);
categoriesRoutes.get("", listCategories_controller_1.listCategoriesController);
categoriesRoutes.get("/:id", getCategory_controller_1.getCategoryController);
categoriesRoutes.delete("/:id", authUser_middleware_1.authUserMiddleware, isAdm_middleware_1.isAdmMiddleware, deleteCategory_controller_1.deleteCategoryController);
categoriesRoutes.patch("/:id", authUser_middleware_1.authUserMiddleware, isAdm_middleware_1.isAdmMiddleware, editCategory_controller_1.editCategoryController);
exports.default = categoriesRoutes;
