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
exports.DayHours = void 0;
const typeorm_1 = require("typeorm");
const provider_schedule_entity_1 = require("./provider_schedule.entity");
let DayHours = class DayHours {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], DayHours.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DayHours.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time" }),
    __metadata("design:type", Date)
], DayHours.prototype, "initHour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time" }),
    __metadata("design:type", Date)
], DayHours.prototype, "limitHour", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => provider_schedule_entity_1.ProviderSchedule, providerSchedule => providerSchedule.dayHours),
    __metadata("design:type", Array)
], DayHours.prototype, "providerSchedule", void 0);
DayHours = __decorate([
    (0, typeorm_1.Entity)("day_hours")
], DayHours);
exports.DayHours = DayHours;
