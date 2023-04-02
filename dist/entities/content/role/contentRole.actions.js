"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.getAllRoles = exports.createContentRole = exports.getContentRoleByName = void 0;
const contentRole_entity_1 = require("./contentRole.entity");
const getContentRoleByName = (guildId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const findTemplate = yield contentRole_entity_1.ContentRoleEntity.findOne({
        where: { guildId, name },
    });
    return findTemplate;
});
exports.getContentRoleByName = getContentRoleByName;
const createContentRole = (guildId, name, emoji) => __awaiter(void 0, void 0, void 0, function* () {
    const newTemplate = new contentRole_entity_1.ContentRoleEntity();
    newTemplate.guildId = guildId;
    newTemplate.name = name;
    newTemplate.emoji = emoji;
    return yield newTemplate.save();
});
exports.createContentRole = createContentRole;
const getAllRoles = (guildId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contentRole_entity_1.ContentRoleEntity.find({ where: { guildId } });
    return result;
});
exports.getAllRoles = getAllRoles;
const deleteRole = (role) => __awaiter(void 0, void 0, void 0, function* () {
    yield role.remove();
    return role;
});
exports.deleteRole = deleteRole;
