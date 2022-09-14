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
exports.ServicesFeedbacks = void 0;
const typeorm_1 = require("typeorm");
const providers_entity_1 = require("./providers.entity");
const services_entity_1 = require("./services.entity");
const users_entity_1 = require("./users.entity");
let ServicesFeedbacks = class ServicesFeedbacks {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ServicesFeedbacks.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ServicesFeedbacks.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 256 }),
    __metadata("design:type", String)
], ServicesFeedbacks.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users),
    __metadata("design:type", users_entity_1.Users)
], ServicesFeedbacks.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => services_entity_1.Services),
    __metadata("design:type", services_entity_1.Services)
], ServicesFeedbacks.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => providers_entity_1.Providers),
    __metadata("design:type", providers_entity_1.Providers)
], ServicesFeedbacks.prototype, "provider", void 0);
ServicesFeedbacks = __decorate([
    (0, typeorm_1.Entity)("services_feedbacks")
], ServicesFeedbacks);
exports.ServicesFeedbacks = ServicesFeedbacks;
