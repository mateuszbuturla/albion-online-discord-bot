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
const args = [
    {
        name: 'command.role-delete.args.name',
        required: true,
    },
];
exports.command = {
    name: 'role-delete',
    descriptionKey: 'command.role-delete.help-description',
    aliases: [],
    args,
    adminOnly: true,
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        const lang = yield (0, entities_1.getServerLanguage)(message.guildId);
        const roleName = args[0];
        const role = yield (0, entities_1.getContentRoleByName)(message.guildId, roleName);
        if (role === null) {
            return (0, components_1.error)(message, {
                key: 'error.role-is-not-exist',
            });
        }
        const result = yield (0, entities_1.deleteRole)(role);
        if (!result) {
            return (0, components_1.error)(message, {
                key: 'error.server-error',
            });
        }
        const embed = yield (0, utils_1.generateEmbed)({
            type: types_1.MessageType.SUCCESS,
            description: {
                key: 'command.role-delete.success',
                args: { roleName },
            },
            lang,
        });
        message.channel.send({ embeds: [embed] });
    }),
};
