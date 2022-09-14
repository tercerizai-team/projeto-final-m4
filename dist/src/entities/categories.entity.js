"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const typeorm_1 = require("typeorm");
const category_provider_entity_1 = require("./category_provider.entity");
let Categories = class Categories {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Categories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Categories.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_provider_entity_1.CategoryProvider, categoryProvider => categoryProvider.category),
    __metadata("design:type", Array)
], Categories.prototype, "categoryProviders", void 0);
Categories = __decorate([
    (0, typeorm_1.Entity)("categories")
], Categories);
exports.Categories = Categories;
