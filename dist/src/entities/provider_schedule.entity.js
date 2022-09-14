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
exports.ProviderSchedule = void 0;
const typeorm_1 = require("typeorm");
const dayHours_entity_1 = require("./dayHours.entity");
const providers_entity_1 = require("./providers.entity");
let ProviderSchedule = class ProviderSchedule {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ProviderSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => providers_entity_1.Providers),
    __metadata("design:type", providers_entity_1.Providers)
], ProviderSchedule.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dayHours_entity_1.DayHours, { eager: true }),
    __metadata("design:type", dayHours_entity_1.DayHours)
], ProviderSchedule.prototype, "dayHours", void 0);
ProviderSchedule = __decorate([
    (0, typeorm_1.Entity)("provider_schedule")
], ProviderSchedule);
exports.ProviderSchedule = ProviderSchedule;
