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
exports.getContentTemplateById = exports.deleteTemplate = exports.removeClassFromTemplate = exports.addClassToTemplate = exports.removeRoleFromTemplate = exports.addRoleToTemplate = exports.getAllTemplates = exports.createTemplate = exports.getContentTemplateByName = void 0;
const contentTemplate_entity_1 = require("./contentTemplate.entity");
const getContentTemplateByName = (guildId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const findTemplate = yield contentTemplate_entity_1.ContentTemplateEntity.findOne({
        where: { guildId, name },
        relations: ['roles', 'classes'],
    });
    return findTemplate;
});
exports.getContentTemplateByName = getContentTemplateByName;
const createTemplate = (guildId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const newTemplate = new contentTemplate_entity_1.ContentTemplateEntity();
    newTemplate.guildId = guildId;
    newTemplate.name = name;
    return yield newTemplate.save();
});
exports.createTemplate = createTemplate;
const getAllTemplates = (guildId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contentTemplate_entity_1.ContentTemplateEntity.find({ where: { guildId } });
    return result;
});
exports.getAllTemplates = getAllTemplates;
const addRoleToTemplate = (template, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (!template.roles.find((item) => item.id === role.id)) {
        template.roles = [...template.roles, role];
        yield template.save();
    }
    return template;
});
exports.addRoleToTemplate = addRoleToTemplate;
const removeRoleFromTemplate = (template, role) => __awaiter(void 0, void 0, void 0, function* () {
    template.roles = template.roles.filter((item) => item.id !== role.id);
    yield template.save();
    return template;
});
exports.removeRoleFromTemplate = removeRoleFromTemplate;
const addClassToTemplate = (template, contentClass) => __awaiter(void 0, void 0, void 0, function* () {
    if (!template.classes.find((item) => item.id === contentClass.id)) {
        template.classes = [...template.classes, contentClass];
        yield template.save();
    }
    return template;
});
exports.addClassToTemplate = addClassToTemplate;
const removeClassFromTemplate = (template, contentClass) => __awaiter(void 0, void 0, void 0, function* () {
    template.classes = template.classes.filter((item) => item.id !== contentClass.id);
    yield template.save();
    return template;
});
exports.removeClassFromTemplate = removeClassFromTemplate;
const deleteTemplate = (template) => __awaiter(void 0, void 0, void 0, function* () {
    yield template.remove();
    return template;
});
exports.deleteTemplate = deleteTemplate;
const getContentTemplateById = (guildId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const findTemplate = yield contentTemplate_entity_1.ContentTemplateEntity.findOne({
        where: { guildId, id },
        relations: ['roles', 'classes'],
    });
    return findTemplate;
});
exports.getContentTemplateById = getContentTemplateById;
