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
exports.event = void 0;
const entities_1 = require("../entities");
const components_1 = require("../components");
const helpers_1 = require("../helpers");
const utils_1 = require("../utils");
exports.event = {
    name: 'messageCreate',
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const prefix = (0, helpers_1.getPrefix)();
            if (message.author.bot ||
                !message.guild ||
                !message.content.startsWith(prefix)) {
                return;
            }
            yield (0, entities_1.generateServerRecord)(message.guildId);
            const lang = yield (0, entities_1.getServerLanguage)(message.guildId);
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLocaleLowerCase();
            if (!cmd)
                return;
            const command = client.commands.get(cmd) || client.aliases.get(cmd);
            if (!command) {
                return (0, components_1.error)(message, {
                    key: 'error.command-not-found',
                    args: { prefix },
                });
            }
            if (command.args) {
                const missingArgs = (0, helpers_1.checkIfAllRequiredArgsAreGiven)(command.args, args);
                if (missingArgs.length > 0) {
                    const { __ } = yield (0, utils_1.translate)(lang);
                    const missingArgsList = missingArgs
                        .map((arg) => '`' + __(arg.name) + '`' + ' ')
                        .toString();
                    return (0, components_1.error)(message, {
                        key: 'error.missing-args',
                        args: {
                            missingArgsList,
                        },
                    });
                }
            }
            if (command.adminOnly && !(0, helpers_1.checkIfUserIsServerAdmin)(message)) {
                return (0, components_1.error)(message, {
                    key: 'error.admin-only',
                });
            }
            command.run(client, message, args);
        }
        catch (e) {
            console.log(e);
        }
    }),
};
