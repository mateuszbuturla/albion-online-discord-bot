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
exports.setContentChannelId = exports.changeServerLanguage = exports.getServerContentChannel = exports.getServerLanguage = exports.generateServerRecord = void 0;
const types_1 = require("../../types");
const serverConfig_entity_1 = require("./serverConfig.entity");
const generateServerRecord = (guildId) => __awaiter(void 0, void 0, void 0, function* () {
    const server = yield serverConfig_entity_1.ServerConfigEntity.findOne({ where: { guildId } });
    if (!server) {
        const newServer = new serverConfig_entity_1.ServerConfigEntity();
        newServer.guildId = guildId;
        return yield newServer.save();
    }
    return server;
});
exports.generateServerRecord = generateServerRecord;
const getServerLanguage = (guildId) => __awaiter(void 0, void 0, void 0, function* () {
    const findServer = yield serverConfig_entity_1.ServerConfigEntity.findOne({ where: { guildId } });
    if (!findServer) {
        return types_1.Language.pl;
    }
    return findServer.lang;
});
exports.getServerLanguage = getServerLanguage;
const getServerContentChannel = (guildId) => __awaiter(void 0, void 0, void 0, function* () {
    const findServer = yield serverConfig_entity_1.ServerConfigEntity.findOne({ where: { guildId } });
    if (!findServer || !findServer.contentChannelId) {
        return null;
    }
    return findServer.contentChannelId;
});
exports.getServerContentChannel = getServerContentChannel;
const changeServerLanguage = (guildId, lang) => __awaiter(void 0, void 0, void 0, function* () {
    const findServer = yield serverConfig_entity_1.ServerConfigEntity.findOne({ where: { guildId } });
    if (!findServer) {
        return false;
    }
    findServer.lang = lang;
    yield findServer.save();
    return true;
});
exports.changeServerLanguage = changeServerLanguage;
const setContentChannelId = (guildId, channelId) => __awaiter(void 0, void 0, void 0, function* () {
    const findServer = yield serverConfig_entity_1.ServerConfigEntity.findOne({ where: { guildId } });
    if (!findServer) {
        return false;
    }
    findServer.contentChannelId = channelId;
    yield findServer.save();
    return true;
});
exports.setContentChannelId = setContentChannelId;
