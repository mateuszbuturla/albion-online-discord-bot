"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const sendMessage = (messageRoot, message) => {
    messageRoot.channel.send({ content: message });
};
exports.sendMessage = sendMessage;
