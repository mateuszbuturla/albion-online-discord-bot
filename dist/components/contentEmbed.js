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
exports.contentEmbed = void 0;
const types_1 = require("../types");
const utils_1 = require("../utils");
const getEmojiForValue = (guildId, emojiName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield globalThis.client.guilds.fetch(guildId)).emojis.cache.find((emoji) => emoji.name === emojiName);
    return result;
});
const getValue = (party) => __awaiter(void 0, void 0, void 0, function* () {
    if (party.length === 0) {
        return '-';
    }
    let result = [];
    for (let i = 0; i < party.length; i++) {
        const item = party[i];
        const emoji = yield getEmojiForValue(item.guildId, item.selectedClass.emoji);
        result = [...result, `${emoji} ${item.userName}`];
    }
    return result.join('\n');
});
const getParticipantsList = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    for (let i = 0; i < event.template.classes.length; i++) {
        const tClass = event.template.classes[i];
        const participantWithClass = event.participants.filter((p) => p.selectedClass.id === tClass.id);
        const classEmoji = yield getEmojiForValue(event.guildId, tClass.emoji);
        result = [
            ...result,
            {
                name: `${classEmoji} ${tClass.name} (${participantWithClass.length})`,
                value: yield getValue(participantWithClass),
                inline: (i + 1) % 4 !== 0,
            },
        ];
    }
    return result;
});
const contentEmbed = (event, lang) => __awaiter(void 0, void 0, void 0, function* () {
    const embed = yield (0, utils_1.generateEmbed)({
        type: types_1.MessageType.INFORMATION,
        customTitle: event.name,
        description: {
            key: 'content.description',
            args: {
                customDescription: event.description,
                id: event.id,
                nick: event.author,
            },
        },
        lang,
    });
    const participants = yield getParticipantsList(event);
    embed.addFields({ name: '📅 Data', value: event.date, inline: true }, { name: '🕑 Godzina', value: event.time, inline: true }, { name: '👥 Grupa', value: `${event.participants.length}`, inline: true }, ...participants);
    return embed;
});
exports.contentEmbed = contentEmbed;
