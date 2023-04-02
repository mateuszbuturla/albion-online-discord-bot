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
exports.ServerConfigEntity = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../../types");
let ServerConfigEntity = class ServerConfigEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], ServerConfigEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ServerConfigEntity.prototype, "guildId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.Language, default: types_1.Language.pl }),
    __metadata("design:type", String)
], ServerConfigEntity.prototype, "lang", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", String)
], ServerConfigEntity.prototype, "contentChannelId", void 0);
ServerConfigEntity = __decorate([
    (0, typeorm_1.Entity)()
], ServerConfigEntity);
exports.ServerConfigEntity = ServerConfigEntity;
