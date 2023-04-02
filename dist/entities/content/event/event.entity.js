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
exports.EventEntity = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../../../types");
const contentTemplate_entity_1 = require("../contentTemplate.entity");
const participant_1 = require("../participant");
let EventEntity = class EventEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], EventEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventEntity.prototype, "guildId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventEntity.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.EventStaus, default: types_1.EventStaus.creating }),
    __metadata("design:type", String)
], EventEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventEntity.prototype, "channelId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], EventEntity.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contentTemplate_entity_1.ContentTemplateEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", contentTemplate_entity_1.ContentTemplateEntity)
], EventEntity.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => participant_1.ContentParticipantEntity, (participant) => participant.event),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], EventEntity.prototype, "participants", void 0);
EventEntity = __decorate([
    (0, typeorm_1.Entity)()
], EventEntity);
exports.EventEntity = EventEntity;
