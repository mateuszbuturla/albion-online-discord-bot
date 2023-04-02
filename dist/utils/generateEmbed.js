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
exports.generateEmbed = void 0;
const discord_js_1 = require("discord.js");
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const getColorByType_1 = require("./getColorByType");
const getRawText_1 = require("./getRawText");
const generateEmbed = ({ type = types_1.MessageType.SUCCESS, description, fields, lang, customTitle, }) => __awaiter(void 0, void 0, void 0, function* () {
    const botName = (0, helpers_1.getBotName)();
    const getRawSingleFieldRow = (fields) => __awaiter(void 0, void 0, void 0, function* () {
        let mappedFields = [];
        for (let field of fields) {
            const rawField = {
                name: yield (0, getRawText_1.getRawText)(field.name, lang),
                value: yield (0, getRawText_1.getRawText)(field.value, lang),
            };
            mappedFields = [...mappedFields, rawField];
        }
        return mappedFields;
    });
    const getRawFieldRows = (fields) => __awaiter(void 0, void 0, void 0, function* () {
        if (fields.length === 0) {
            return [];
        }
        if (Array.isArray(fields[0])) {
            let mappedRows = [];
            for (let row of fields) {
                let mappedFields = yield getRawSingleFieldRow(row);
                mappedRows = [...mappedRows, mappedFields];
            }
            return mappedRows;
        }
        let mappedFields = yield getRawSingleFieldRow(fields);
        return [mappedFields];
    });
    const embed = new discord_js_1.EmbedBuilder()
        .setColor((0, getColorByType_1.getColorByType)(type))
        .setTitle(customTitle ? customTitle : botName)
        .setTimestamp()
        .setFooter({
        text: botName,
    });
    if (description) {
        embed.setDescription(yield (0, getRawText_1.getRawText)(description, lang));
    }
    if (fields) {
        const rawFields = yield getRawFieldRows(fields);
        rawFields.map((fieldsRow) => {
            embed.addFields(fieldsRow);
        });
    }
    return embed;
});
exports.generateEmbed = generateEmbed;
