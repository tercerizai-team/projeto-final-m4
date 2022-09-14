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
exports.Addresses = void 0;
const typeorm_1 = require("typeorm");
const addresses_users_entity_1 = require("./addresses_users.entity");
const schedules_entity_1 = require("./schedules.entity");
const users_entity_1 = require("./users.entity");
let Addresses = class Addresses {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Addresses.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 2 }),
    __metadata("design:type", String)
], Addresses.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], Addresses.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 8 }),
    __metadata("design:type", String)
], Addresses.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 8 }),
    __metadata("design:type", String)
], Addresses.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], Addresses.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], Addresses.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45, nullable: true }),
    __metadata("design:type", String)
], Addresses.prototype, "complement", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => addresses_users_entity_1.AddressesUsers, (addressesUsers) => addressesUsers.address),
    __metadata("design:type", users_entity_1.Users)
], Addresses.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => schedules_entity_1.Schedules, (schedules) => schedules.address),
    __metadata("design:type", Array)
], Addresses.prototype, "schedules", void 0);
Addresses = __decorate([
    (0, typeorm_1.Entity)("addresses")
], Addresses);
exports.Addresses = Addresses;
