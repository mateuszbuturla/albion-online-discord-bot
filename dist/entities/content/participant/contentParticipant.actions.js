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
exports.removeParticipantFromEvent = exports.updateParticipantClass = exports.getParticipantFromEvent = exports.createContentParticipant = void 0;
const contentParticipant_entity_1 = require("./contentParticipant.entity");
const createContentParticipant = (guildId, userId, userName, selectedClass) => __awaiter(void 0, void 0, void 0, function* () {
    const newParticipant = new contentParticipant_entity_1.ContentParticipantEntity();
    newParticipant.guildId = guildId;
    newParticipant.userId = userId;
    newParticipant.selectedClass = selectedClass;
    newParticipant.userName = userName;
    return yield newParticipant.save();
});
exports.createContentParticipant = createContentParticipant;
const getParticipantFromEvent = (event, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contentParticipant_entity_1.ContentParticipantEntity.findOne({
        where: { userId, event: { id: event.id } },
        relations: ['selectedClass'],
    });
    return result;
});
exports.getParticipantFromEvent = getParticipantFromEvent;
const updateParticipantClass = (participant, selectedClass) => __awaiter(void 0, void 0, void 0, function* () {
    participant.selectedClass = selectedClass;
    return yield participant.save();
});
exports.updateParticipantClass = updateParticipantClass;
const removeParticipantFromEvent = (participant) => __awaiter(void 0, void 0, void 0, function* () {
    return yield participant.remove();
});
exports.removeParticipantFromEvent = removeParticipantFromEvent;
