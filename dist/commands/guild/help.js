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
const entities_1 = require("../../entities");
const utils_1 = require("../../utils");
const helpers_1 = require("../../helpers");
const types_1 = require("../../types");
const components_1 = require("../../components");
const getListOfCommandsAsString = (commands) => {
    const prefix = (0, helpers_1.getPrefix)();
    return commands.map((x) => '`' + prefix + x.name + '`').join(' | ');
};
const sendCommandList = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    const prefix = (0, helpers_1.getPrefix)();
    const commands = client.commands;
    const lang = yield (0, entities_1.getServerLanguage)(message.guildId);
    const commandListField = {
        name: {
            key: 'command.help.command-list',
            args: { count: commands.size },
        },
        value: getListOfCommandsAsString(commands),
    };
    const embed = yield (0, utils_1.generateEmbed)({
        type: types_1.MessageType.INFORMATION,
        description: { key: 'command.help.description', args: { prefix } },
        fields: [commandListField],
        lang,
    });
    message.channel.send({ embeds: [embed] });
});
const sendSpecyficCommandDescription = (client, message, commandName) => __awaiter(void 0, void 0, void 0, function* () {
    const prefix = (0, helpers_1.getPrefix)();
    const lang = yield (0, entities_1.getServerLanguage)(message.guildId);
    const command = client.commands.get(commandName) || client.aliases.get(commandName);
    if (!command) {
        return (0, components_1.error)(message, {
            key: 'error.command-not-found',
            args: { prefix },
        });
    }
    if (!command.descriptionKey) {
        const embed = yield (0, utils_1.generateEmbed)({
            type: types_1.MessageType.ERROR,
            description: {
                key: 'error.command-no-description',
                args: { command: `${prefix}${commandName}` },
            },
            lang,
        });
        return message.channel.send({ embeds: [embed] });
    }
    const commandDescriptionField = {
        name: `${prefix}${command.name}`,
        value: { key: command.descriptionKey },
    };
    const embed = yield (0, utils_1.generateEmbed)({
        type: types_1.MessageType.INFORMATION,
        fields: [commandDescriptionField],
        lang,
    });
    message.channel.send({ embeds: [embed] });
});
exports.command = {
    name: 'help',
    descriptionKey: 'command.help.help-description',
    aliases: [],
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (args.length === 0) {
            return yield sendCommandList(client, message);
        }
        return yield sendSpecyficCommandDescription(client, message, args[0]);
    }),
};
