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
exports.ContentTemplateEntity = void 0;
const typeorm_1 = require("typeorm");
const class_1 = require("./class");
const role_1 = require("./role");
let ContentTemplateEntity = class ContentTemplateEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], ContentTemplateEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ContentTemplateEntity.prototype, "guildId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ContentTemplateEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_1.ContentRoleEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ContentTemplateEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => class_1.ContentClassEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ContentTemplateEntity.prototype, "classes", void 0);
ContentTemplateEntity = __decorate([
    (0, typeorm_1.Entity)()
], ContentTemplateEntity);
exports.ContentTemplateEntity = ContentTemplateEntity;
