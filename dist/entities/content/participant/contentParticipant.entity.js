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
exports.ContentParticipantEntity = void 0;
const typeorm_1 = require("typeorm");
const class_1 = require("../class");
const event_1 = require("../event");
let ContentParticipantEntity = class ContentParticipantEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], ContentParticipantEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ContentParticipantEntity.prototype, "guildId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ContentParticipantEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ContentParticipantEntity.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ContentParticipantEntity.prototype, "reminderSent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => class_1.ContentClassEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", class_1.ContentClassEntity)
], ContentParticipantEntity.prototype, "selectedClass", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_1.EventEntity, { onDelete: 'CASCADE' }),
    __metadata("design:type", event_1.EventEntity)
], ContentParticipantEntity.prototype, "event", void 0);
ContentParticipantEntity = __decorate([
    (0, typeorm_1.Entity)()
], ContentParticipantEntity);
exports.ContentParticipantEntity = ContentParticipantEntity;
