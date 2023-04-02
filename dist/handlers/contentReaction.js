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
exports.contentReactionHandler = void 0;
const components_1 = require("../components");
const entities_1 = require("../entities");
const updateEmbed = (message, event, lang) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmbed = yield (0, components_1.contentEmbed)(event, lang);
    message.edit({ embeds: [newEmbed] });
});
const getEventAndUpdateEmbed = (message, id, lang) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, entities_1.getEventById)(id);
    if (!result) {
        return;
    }
    yield updateEmbed(message, result, lang);
});
const contentReactionHandler = (message, eventId, lang) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = () => true;
    const collector = message.createReactionCollector({
        filter,
    });
    collector.on('collect', (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (user.bot) {
            return;
        }
        const event = yield (0, entities_1.getEventById)(eventId);
        if (!event) {
            return;
        }
        message.reactions.resolve(reaction).users.remove(user);
        const userId = user.id;
        const userName = user.username;
        const guildId = reaction.message.guildId;
        const selectedClass = reaction.emoji.name;
        const findClass = yield (0, entities_1.getContentClassByEmoji)(guildId, selectedClass);
        if (findClass) {
            const findParticipant = yield (0, entities_1.getParticipantFromEvent)(event, userId);
            if (!findParticipant) {
                const participant = yield (0, entities_1.createContentParticipant)(guildId, userId, userName, findClass);
                const result = yield (0, entities_1.addParticipantToEvent)(event, participant);
                if (!result) {
                    return;
                }
                yield updateEmbed(message, event, lang);
                return;
            }
            if (findParticipant.selectedClass.id === findClass.id) {
                yield (0, entities_1.removeParticipantFromEvent)(findParticipant);
                yield getEventAndUpdateEmbed(message, event.id, lang);
                return;
            }
            yield (0, entities_1.updateParticipantClass)(findParticipant, findClass);
            yield getEventAndUpdateEmbed(message, event.id, lang);
        }
    }));
});
exports.contentReactionHandler = contentReactionHandler;
