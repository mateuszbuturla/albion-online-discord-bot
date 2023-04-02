"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrefix = void 0;
const getPrefix = () => {
    const prefix = 'ko!';
    if (!prefix) {
        throw new Error('PREFIX is not defined');
    }
    return prefix;
};
exports.getPrefix = getPrefix;
