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
exports.AddressesUsers = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const addresses_entity_1 = require("./addresses.entity");
const users_entity_1 = require("./users.entity");
let AddressesUsers = class AddressesUsers {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], AddressesUsers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => addresses_entity_1.Addresses, { eager: true }),
    __metadata("design:type", addresses_entity_1.Addresses)
], AddressesUsers.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, { eager: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", users_entity_1.Users)
], AddressesUsers.prototype, "user", void 0);
AddressesUsers = __decorate([
    (0, typeorm_1.Entity)("addresses_users")
], AddressesUsers);
exports.AddressesUsers = AddressesUsers;
