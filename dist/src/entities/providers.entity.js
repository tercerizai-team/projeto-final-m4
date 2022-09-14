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
exports.Providers = void 0;
const typeorm_1 = require("typeorm");
const addresses_entity_1 = require("./addresses.entity");
const category_provider_entity_1 = require("./category_provider.entity");
const provider_schedule_entity_1 = require("./provider_schedule.entity");
const schedules_entity_1 = require("./schedules.entity");
const services_feedbacks_entity_1 = require("./services_feedbacks.entity");
const users_feedbacks_entity_1 = require("./users_feedbacks.entity");
const uuid_1 = require("uuid");
let Providers = class Providers {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Providers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Providers.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Providers.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Providers.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Providers.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Providers.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Providers.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Providers.prototype, "isPremium", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Providers.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Providers.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => addresses_entity_1.Addresses, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", addresses_entity_1.Addresses)
], Providers.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_provider_entity_1.CategoryProvider, (categoryProvider) => categoryProvider.provider, { eager: true }),
    __metadata("design:type", Array)
], Providers.prototype, "providerCategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => schedules_entity_1.Schedules, (schedules) => schedules.provider, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Providers.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => services_feedbacks_entity_1.ServicesFeedbacks, (servicesFeedbacks) => servicesFeedbacks.provider, { eager: true }),
    __metadata("design:type", Array)
], Providers.prototype, "feedbacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => users_feedbacks_entity_1.UsersFeedbacks, (usersFeedbacks) => usersFeedbacks.provider),
    __metadata("design:type", Array)
], Providers.prototype, "givedFeedbacks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => provider_schedule_entity_1.ProviderSchedule, (providerSchedule) => providerSchedule.provider, { eager: true }),
    __metadata("design:type", Array)
], Providers.prototype, "providerSchedule", void 0);
Providers = __decorate([
    (0, typeorm_1.Entity)("providers"),
    __metadata("design:paramtypes", [])
], Providers);
exports.Providers = Providers;
