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
        name: 'command.template-details.args.name',
        required: true,
    },
];
const getListOfRolesAsString = (roles) => {
    return roles.map((x) => '`' + x.name + '`').join(' | ');
};
const getListOfClassesAsString = (classes) => {
    return classes.map((x) => '`' + x.name + '`').join(' | ');
};
exports.command = {
    name: 'template-details',
    descriptionKey: 'command.template-create.help-description',
    aliases: [],
    args,
    adminOnly: true,
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const lang = yield (0, entities_1.getServerLanguage)(message.guildId);
        const name = args[0];
        const template = yield (0, entities_1.getContentTemplateByName)(message.guildId, name);
        if (template === null) {
            return (0, components_1.error)(message, {
                key: 'error.template-with-provided-name-is-exist',
            });
        }
        const rolesListField = {
            name: {
                key: 'command.template-details.roles-list',
                args: { count: template.roles.length },
            },
            value: (_a = getListOfRolesAsString(template.roles)) !== null && _a !== void 0 ? _a : '',
        };
        const classesListField = {
            name: {
                key: 'command.template-details.classes-list',
                args: { count: template.classes.length },
            },
            value: (_b = getListOfClassesAsString(template.classes)) !== null && _b !== void 0 ? _b : '',
        };
        let fields = [];
        if (template.roles.length > 0) {
            fields = [...fields, rolesListField];
        }
        if (template.classes.length > 0) {
            fields = [...fields, classesListField];
        }
        const embed = yield (0, utils_1.generateEmbed)({
            type: types_1.MessageType.INFORMATION,
            description: {
                key: 'command.template-details.description',
                args: { name },
            },
            fields,
            lang,
        });
        message.channel.send({ embeds: [embed] });
    }),
};
