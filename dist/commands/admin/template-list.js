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
const components_1 = require("../../components");
const entities_1 = require("../../entities");
const types_1 = require("../../types");
const getListOfTemplatesAsString = (templates) => {
    return templates.map((x) => '`' + x.name + '`').join(' | ');
};
exports.command = {
    name: 'template-list',
    descriptionKey: 'command.template-list.help-description',
    aliases: [],
    adminOnly: true,
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        const lang = yield (0, entities_1.getServerLanguage)(message.guildId);
        const result = yield (0, entities_1.getAllTemplates)(message.guildId);
        if (!result || result.length === 0) {
            return (0, components_1.error)(message, {
                key: 'error.templates-list-is-empty',
            });
        }
        const templatesListField = {
            name: {
                key: 'command.template-list.template-list',
                args: { count: result.length },
            },
            value: getListOfTemplatesAsString(result),
        };
        const embed = yield (0, utils_1.generateEmbed)({
            type: types_1.MessageType.INFORMATION,
            fields: [templatesListField],
            lang,
        });
        message.channel.send({ embeds: [embed] });
    }),
};
