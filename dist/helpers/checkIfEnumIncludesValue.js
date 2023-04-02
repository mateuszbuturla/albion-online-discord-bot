"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfEnumIncludesValue = void 0;
const checkIfEnumIncludesValue = (enumObj, value) => {
    const values = Object.values(enumObj);
    return values.includes(value);
};
exports.checkIfEnumIncludesValue = checkIfEnumIncludesValue;
