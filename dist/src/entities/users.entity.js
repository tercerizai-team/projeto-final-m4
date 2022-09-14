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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const addresses_users_entity_1 = require("./addresses_users.entity");
const schedules_entity_1 = require("./schedules.entity");
const users_feedbacks_entity_1 = require("./users_feedbacks.entity");
const uuid_1 = require("uuid");
const services_feedbacks_entity_1 = require("./services_feedbacks.entity");
let Users = class Users {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isAdm", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => addresses_users_entity_1.AddressesUsers, (addressesUsers) => addressesUsers.user),
    __metadata("design:type", Array)
], Users.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => schedules_entity_1.Schedules, (schedules) => schedules.user, { eager: true }),
    __metadata("design:type", Array)
], Users.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => users_feedbacks_entity_1.UsersFeedbacks, (usersFeedbacks) => usersFeedbacks.user, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Users.prototype, "feedbacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => services_feedbacks_entity_1.ServicesFeedbacks, (serviceFeedbacks) => serviceFeedbacks.user),
    __metadata("design:type", Array)
], Users.prototype, "givedfeedbacks", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)("users"),
    __metadata("design:paramtypes", [])
], Users);
exports.Users = Users;
