"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmoji = void 0;
const getEmoji = (message, emojiName) => {
    var _a;
    return (_a = message.guild) === null || _a === void 0 ? void 0 : _a.emojis.cache.find((emoji) => emoji.name === emojiName);
};
exports.getEmoji = getEmoji;
