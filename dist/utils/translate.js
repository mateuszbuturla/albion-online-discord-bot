"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = exports.getTranslations = exports.safeResolve = void 0;
const fs = __importStar(require("fs"));
const node_polyglot_1 = __importDefault(require("node-polyglot"));
const path = __importStar(require("path"));
const types_1 = require("../types");
const util_1 = require("util");
const assetsDir_1 = require("./assetsDir");
const TRANSLATIONS_CACHE = {};
function safeResolve(base, target) {
    const targetPath = '.' + path.posix.normalize('/' + target);
    return path.posix.resolve(base, targetPath);
}
exports.safeResolve = safeResolve;
const getTranslations = (lang) => __awaiter(void 0, void 0, void 0, function* () {
    if (!TRANSLATIONS_CACHE[lang]) {
        const read = yield (0, util_1.promisify)(fs.readFile)(safeResolve(`${(0, assetsDir_1.assetsDir)()}/lang`, `${lang}.json`), 'utf-8');
        TRANSLATIONS_CACHE[lang] = JSON.parse(read);
    }
    return TRANSLATIONS_CACHE[lang];
});
exports.getTranslations = getTranslations;
const createPolyglot = (lang) => __awaiter(void 0, void 0, void 0, function* () {
    return new node_polyglot_1.default(yield (0, exports.getTranslations)(lang));
});
const translate = (lang) => __awaiter(void 0, void 0, void 0, function* () {
    const polyglotEn = yield createPolyglot(types_1.Language[lang]);
    const __ = (text, args) => polyglotEn.t(text, args);
    const myLang = polyglotEn.locale();
    return { __, myLang };
});
exports.translate = translate;
