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
const entities_1 = require("../../entities");
const types_1 = require("../../types");
const args = [
    {
        name: 'command.setup.args.module',
        required: true,
    },
];
exports.command = {
    name: 'setup',
    descriptionKey: 'command.setup.help-description',
    aliases: [],
    args,
    adminOnly: true,
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        const lang = yield (0, entities_1.getServerLanguage)(message.guildId);
        const module = args[0];
        const parseModule = types_1.BotModules[module];
        if (parseModule === types_1.BotModules.content) {
            const result = yield (0, entities_1.setContentChannelId)(message.guildId, message.channelId);
            const embed = yield (0, utils_1.generateEmbed)({
                type: types_1.MessageType.SUCCESS,
                description: { key: 'command.setup.content.success' },
                lang,
            });
            message.channel.send({ embeds: [embed] });
        }
    }),
};
