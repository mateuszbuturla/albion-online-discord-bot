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
exports.deleteClass = exports.getAllClasses = exports.createContentClass = exports.getContentClassByEmoji = exports.getContentClassByName = void 0;
const contentClass_entity_1 = require("./contentClass.entity");
const getContentClassByName = (guildId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const findClass = yield contentClass_entity_1.ContentClassEntity.findOne({
        where: { guildId, name },
    });
    return findClass;
});
exports.getContentClassByName = getContentClassByName;
const getContentClassByEmoji = (guildId, emoji) => __awaiter(void 0, void 0, void 0, function* () {
    const findClass = yield contentClass_entity_1.ContentClassEntity.findOne({
        where: { guildId, emoji },
    });
    return findClass;
});
exports.getContentClassByEmoji = getContentClassByEmoji;
const createContentClass = (guildId, name, emoji) => __awaiter(void 0, void 0, void 0, function* () {
    const newTemplate = new contentClass_entity_1.ContentClassEntity();
    newTemplate.guildId = guildId;
    newTemplate.name = name;
    newTemplate.emoji = emoji;
    return yield newTemplate.save();
});
exports.createContentClass = createContentClass;
const getAllClasses = (guildId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contentClass_entity_1.ContentClassEntity.find({ where: { guildId } });
    return result;
});
exports.getAllClasses = getAllClasses;
const deleteClass = (contentClass) => __awaiter(void 0, void 0, void 0, function* () {
    yield contentClass.remove();
    return contentClass;
});
exports.deleteClass = deleteClass;
