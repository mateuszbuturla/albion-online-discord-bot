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
exports.getRawText = void 0;
const translate_1 = require("./translate");
const getRawText = (text, lang) => __awaiter(void 0, void 0, void 0, function* () {
    const { __ } = yield (0, translate_1.translate)(lang);
    if (typeof text === 'string') {
        return text;
    }
    return __(text.key, text.args);
});
exports.getRawText = getRawText;
