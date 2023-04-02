"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotName = void 0;
const getBotName = () => {
    const botName = process.env.BOT_NAME;
    if (!botName) {
        throw new Error('BOT_NAME is not defined');
    }
    return botName;
};
exports.getBotName = getBotName;
