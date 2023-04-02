"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserIsServerAdmin = void 0;
const checkIfUserIsServerAdmin = (message) => {
    if (!message.member) {
        return false;
    }
    return message.member.permissions.has('Administrator');
};
exports.checkIfUserIsServerAdmin = checkIfUserIsServerAdmin;
