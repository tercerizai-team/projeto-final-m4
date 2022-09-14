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
exports.Schedules = void 0;
const typeorm_1 = require("typeorm");
const addresses_entity_1 = require("./addresses.entity");
const providers_entity_1 = require("./providers.entity");
const users_entity_1 = require("./users.entity");
let Schedules = class Schedules {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Schedules.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time" }),
    __metadata("design:type", Date)
], Schedules.prototype, "hour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time", nullable: true }),
    __metadata("design:type", Date)
], Schedules.prototype, "finishServiceHour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Schedules.prototype, "serviceDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Schedules.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 90 }),
    __metadata("design:type", String)
], Schedules.prototype, "serviceDescription", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Schedules.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Schedules.prototype, "clientConfirmed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Schedules.prototype, "providerConfirmed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => providers_entity_1.Providers),
    __metadata("design:type", providers_entity_1.Providers)
], Schedules.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users),
    __metadata("design:type", users_entity_1.Users)
], Schedules.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => addresses_entity_1.Addresses, { eager: true }),
    __metadata("design:type", addresses_entity_1.Addresses)
], Schedules.prototype, "address", void 0);
Schedules = __decorate([
    (0, typeorm_1.Entity)("schedules")
], Schedules);
exports.Schedules = Schedules;
