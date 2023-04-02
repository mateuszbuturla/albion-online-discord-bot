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
        name: 'command.template-class.args.template-name',
        required: true,
    },
    {
        name: 'command.template-class.args.action',
        required: true,
    },
    {
        name: 'command.template-class.args.class-name',
        required: true,
    },
];
const checkIfClassIsExist = (guildId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const templateClass = yield (0, entities_1.getContentClassByName)(guildId, name);
    return !!templateClass;
});
const checkIfTemplateNameIsExist = (guildId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const template = yield (0, entities_1.getContentTemplateByName)(guildId, name);
    return !!template;
});
const addClassToTemplate = (message, guildId, templateName, className) => __awaiter(void 0, void 0, void 0, function* () {
    const lang = yield (0, entities_1.getServerLanguage)(guildId);
    const template = yield (0, entities_1.getContentTemplateByName)(guildId, templateName);
    const contentClass = yield (0, entities_1.getContentClassByName)(guildId, className);
    if (!template || !contentClass) {
        return (0, components_1.error)(message, {
            key: 'error.server-error',
        });
    }
    const result = yield (0, entities_1.addClassToTemplate)(template, contentClass);
    if (!result) {
        return (0, components_1.error)(message, {
            key: 'error.server-error',
        });
    }
    const embed = yield (0, utils_1.generateEmbed)({
        type: types_1.MessageType.SUCCESS,
        description: {
            key: 'command.template-class.add.success',
            args: { templateName, className },
        },
        lang,
    });
    message.channel.send({ embeds: [embed] });
});
const removeClassfromTemplate = (message, guildId, templateName, className) => __awaiter(void 0, void 0, void 0, function* () {
    const lang = yield (0, entities_1.getServerLanguage)(guildId);
    const template = yield (0, entities_1.getContentTemplateByName)(guildId, templateName);
    const contentClass = yield (0, entities_1.getContentClassByName)(guildId, className);
    if (!template || !contentClass) {
        return (0, components_1.error)(message, {
            key: 'error.server-error',
        });
    }
    const result = yield (0, entities_1.removeClassFromTemplate)(template, contentClass);
    if (!result) {
        return (0, components_1.error)(message, {
            key: 'error.server-error',
        });
    }
    const embed = yield (0, utils_1.generateEmbed)({
        type: types_1.MessageType.SUCCESS,
        description: {
            key: 'command.template-class.remove.success',
            args: { templateName, className },
        },
        lang,
    });
    message.channel.send({ embeds: [embed] });
});
exports.command = {
    name: 'template-class',
    descriptionKey: 'command.template-class.help-description',
    aliases: [],
    args,
    adminOnly: true,
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        const templateName = args[0];
        const action = args[1];
        const className = args[2];
        if (!(yield checkIfTemplateNameIsExist(message.guildId, templateName))) {
            return (0, components_1.error)(message, {
                key: 'error.template-is-not-exist',
            });
        }
        if (!(0, helpers_1.checkIfEnumIncludesValue)(types_1.ContentManageActions, action)) {
            return (0, components_1.error)(message, { key: 'error.incorrect-action' });
        }
        if (!(yield checkIfClassIsExist(message.guildId, className))) {
            return (0, components_1.error)(message, {
                key: 'error.class-is-not-exist',
            });
        }
        const parseAction = types_1.ContentManageActions[action];
        if (parseAction === types_1.ContentManageActions.add) {
            yield addClassToTemplate(message, message.guildId, templateName, className);
        }
        else if (parseAction === types_1.ContentManageActions.remove) {
            yield removeClassfromTemplate(message, message.guildId, templateName, className);
        }
    }),
};
