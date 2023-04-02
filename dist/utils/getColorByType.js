"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorByType = void 0;
const types_1 = require("../types");
const colorSuccess = 0x00ba0c;
const colorError = 0xb00202;
const colorInformation = 0x0389a1;
const getColorByType = (type) => {
    switch (type) {
        case types_1.MessageType.SUCCESS:
            return colorSuccess;
        case types_1.MessageType.ERROR:
            return colorError;
        case types_1.MessageType.INFORMATION:
            return colorInformation;
    }
};
exports.getColorByType = getColorByType;
