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
const helpers_1 = require("../../helpers");
const args = [
    {
        name: 'command.lang.args.language',
        required: true,
    },
];
exports.command = {
    name: 'lang',
    descriptionKey: 'command.lang.help-description',
    aliases: [],
    args,
    adminOnly: true,
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, helpers_1.checkIfEnumIncludesValue)(types_1.Language, args[0])) {
            return (0, components_1.error)(message, { key: 'error.language-not-exist' });
        }
        const lang = types_1.Language[args[0]];
        const result = yield (0, entities_1.changeServerLanguage)(message.guildId, lang);
        if (!result) {
            return (0, components_1.error)(message, {
                key: 'error.server-error',
            });
        }
        const embed = yield (0, utils_1.generateEmbed)({
            type: types_1.MessageType.SUCCESS,
            description: { key: 'command.lang.success', args: { lang } },
            lang,
        });
        message.channel.send({ embeds: [embed] });
    }),
};
