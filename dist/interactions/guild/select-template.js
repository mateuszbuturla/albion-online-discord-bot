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
exports.interaction = void 0;
const components_1 = require("../../components");
const entities_1 = require("../../entities");
exports.interaction = {
    name: 'template',
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = interaction.user.id;
        const templateId = interaction.values[0];
        const event = yield (0, entities_1.getEventByUserIdWithStatusCreating)(userId);
        if (!event) {
            interaction.reply({ content: 'Wystąpił błąd po stronie serwera' });
            return;
        }
        const template = yield (0, entities_1.getContentTemplateById)(event.guildId, templateId);
        if (!template) {
            interaction.reply({ content: 'Szablon nie istnieje' });
            return;
        }
        const result = yield (0, entities_1.saveTemplateToEvent)(event, template);
        if (!result) {
            interaction.reply({ content: 'Wystąpił błąd po stronie serwera' });
            return;
        }
        const modal = (0, components_1.createContentModal)();
        yield interaction.showModal(modal);
        yield interaction.message.delete();
    }),
};
