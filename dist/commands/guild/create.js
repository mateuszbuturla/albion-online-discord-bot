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
exports.command = void 0;
const utils_1 = require("../../utils");
const types_1 = require("../../types");
const entities_1 = require("../../entities");
const discord_js_1 = require("discord.js");
const components_1 = require("../../components");
const getSelectTemplateOptions = (templates) => {
    return templates.map((item) => ({ label: item.name, value: `${item.id}` }));
};
exports.command = {
    name: 'create',
    descriptionKey: 'command.create.help-description',
    aliases: [],
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const lang = yield (0, entities_1.getServerLanguage)(message.guildId);
        const templates = yield (0, entities_1.getAllTemplates)(message.guildId);
        if (templates.length === 0) {
            return (0, components_1.error)(message, {
                key: 'error.no-templates-defined',
            });
        }
        const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.SelectMenuBuilder()
            .setCustomId('template')
            .setPlaceholder('Nothing selected')
            .addOptions(getSelectTemplateOptions(templates)));
        const result = yield (0, entities_1.createEvent)(message.guildId, message.author.id, (_b = (_a = message.member) === null || _a === void 0 ? void 0 : _a.displayName) !== null && _b !== void 0 ? _b : message.author.username);
        if (!result) {
            return (0, components_1.error)(message, {
                key: 'error.server-error',
            });
        }
        const embed = yield (0, utils_1.generateEmbed)({
            type: types_1.MessageType.SUCCESS,
            description: { key: 'command.create.description-template-select' },
            lang,
        });
        message.author.send({ embeds: [embed], components: [row] });
        message.delete();
    }),
};
