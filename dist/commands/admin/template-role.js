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
        name: 'command.template-role.args.template-name',
        required: true,
    },
    {
        name: 'command.template-role.args.action',
        required: true,
    },
    {
        name: 'command.template-role.args.role-name',
        required: true,
    },
];
const checkIfRoleIsExist = (guildId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const templateClass = yield (0, entities_1.getContentRoleByName)(guildId, name);
    return !!templateClass;
});
const checkIfTemplateNameIsExist = (guildId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const template = yield (0, entities_1.getContentTemplateByName)(guildId, name);
    return !!template;
});
const addRoleToTemplate = (message, guildId, templateName, roleName) => __awaiter(void 0, void 0, void 0, function* () {
    const lang = yield (0, entities_1.getServerLanguage)(guildId);
    const template = yield (0, entities_1.getContentTemplateByName)(guildId, templateName);
    const role = yield (0, entities_1.getContentRoleByName)(guildId, roleName);
    if (!template || !role) {
        return (0, components_1.error)(message, {
            key: 'error.server-error',
        });
    }
    const result = yield (0, entities_1.addRoleToTemplate)(template, role);
    if (!result) {
        return (0, components_1.error)(message, {
            key: 'error.server-error',
        });
    }
    const embed = yield (0, utils_1.generateEmbed)({
        type: types_1.MessageType.SUCCESS,
        description: {
            key: 'command.template-role.add.success',
            args: { templateName, roleName },
        },
        lang,
    });
    message.channel.send({ embeds: [embed] });
});
const removeRolefromTemplate = (message, guildId, templateName, roleName) => __awaiter(void 0, void 0, void 0, function* () {
    const lang = yield (0, entities_1.getServerLanguage)(guildId);
    const template = yield (0, entities_1.getContentTemplateByName)(guildId, templateName);
    const role = yield (0, entities_1.getContentRoleByName)(guildId, roleName);
    if (!template || !role) {
        return (0, components_1.error)(message, {
            key: 'error.server-error',
        });
    }
    const result = yield (0, entities_1.removeRoleFromTemplate)(template, role);
    if (!result) {
        return (0, components_1.error)(message, {
            key: 'error.server-error',
        });
    }
    const embed = yield (0, utils_1.generateEmbed)({
        type: types_1.MessageType.SUCCESS,
        description: {
            key: 'command.template-role.remove.success',
            args: { templateName, roleName },
        },
        lang,
    });
    message.channel.send({ embeds: [embed] });
});
exports.command = {
    name: 'template-role',
    descriptionKey: 'command.template-role.help-description',
    aliases: [],
    args,
    adminOnly: true,
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        const templateName = args[0];
        const action = args[1];
        const roleName = args[2];
        if (!(yield checkIfTemplateNameIsExist(message.guildId, templateName))) {
            return (0, components_1.error)(message, {
                key: 'error.template-is-not-exist',
            });
        }
        if (!(0, helpers_1.checkIfEnumIncludesValue)(types_1.ContentManageActions, action)) {
            return (0, components_1.error)(message, { key: 'error.incorrect-action' });
        }
        if (!(yield checkIfRoleIsExist(message.guildId, roleName))) {
            return (0, components_1.error)(message, {
                key: 'error.role-is-not-exist',
            });
        }
        const parseAction = types_1.ContentManageActions[action];
        if (parseAction === types_1.ContentManageActions.add) {
            yield addRoleToTemplate(message, message.guildId, templateName, roleName);
        }
        else if (parseAction === types_1.ContentManageActions.remove) {
            yield removeRolefromTemplate(message, message.guildId, templateName, roleName);
        }
    }),
};
