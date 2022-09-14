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
exports.Services = void 0;
const typeorm_1 = require("typeorm");
const schedules_entity_1 = require("./schedules.entity");
const services_feedbacks_entity_1 = require("./services_feedbacks.entity");
let Services = class Services {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Services.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Services.prototype, "isServiceFinished", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Services.prototype, "isServiceCanceled", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Services.prototype, "finalizedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Services.prototype, "clientFinished", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Services.prototype, "providerFinished", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => schedules_entity_1.Schedules, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", schedules_entity_1.Schedules)
], Services.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => services_feedbacks_entity_1.ServicesFeedbacks, (serviceFeedbacks) => serviceFeedbacks.service, { eager: true }),
    __metadata("design:type", Array)
], Services.prototype, "feedbacks", void 0);
Services = __decorate([
    (0, typeorm_1.Entity)("services")
], Services);
exports.Services = Services;
