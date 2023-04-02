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
const entities_1 = require("../../entities");
const components_1 = require("../../components");
const handlers_1 = require("../../handlers");
const utils_1 = require("../../utils");
const finishEventSetup = (userId, eventName, eventDescription, date, time) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield (0, entities_1.getEventByUserIdWithStatusCreating)(userId);
    if (!event) {
        console.log('missing event');
        return;
    }
    const result = yield (0, entities_1.finishEventCreation)(event, eventName, eventDescription, date, time);
    return result;
});
const generateReactions = (message, event) => {
    [...event.template.roles, ...event.template.classes].forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        const reactionEmoji = (0, utils_1.getEmoji)(message, item.emoji);
        message.react(`${reactionEmoji}`);
    }));
};
const sendDMMessage = (interaction, message) => __awaiter(void 0, void 0, void 0, function* () {
    yield interaction.reply({
        content: message,
    });
});
const validateDateAndTime = (eventDate, eventTime) => {
    const dateRegex = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    const timeRegex = /^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
    const isValidDate = dateRegex.test(eventDate);
    const isValidTime = timeRegex.test(eventTime);
    return isValidDate && isValidTime;
};
exports.interaction = {
    name: 'submit-event',
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = interaction.user.id;
        const eventName = interaction.fields.getTextInputValue('eventName');
        const eventDescription = interaction.fields.getTextInputValue('eventDescription');
        const eventDate = interaction.fields.getTextInputValue('eventDate');
        const eventTime = interaction.fields.getTextInputValue('eventTime');
        const validationResult = validateDateAndTime(eventDate, eventTime);
        if (!validationResult) {
            yield sendDMMessage(interaction, 'Nie prawidłowy format daty lub godziny');
            return;
        }
        const event = yield finishEventSetup(userId, eventName, eventDescription, eventDate, eventTime);
        if (!event) {
            interaction.reply({ content: 'Wystąpił błąd po stronie serwera' });
            return;
        }
        const lang = yield (0, entities_1.getServerLanguage)(event.guildId);
        const contentChannelId = yield (0, entities_1.getServerContentChannel)(event.guildId);
        if (!contentChannelId) {
            interaction.reply({
                content: 'Serwer nie posiada zdefiniowanego kanału dla wydarzeń. Skontaktuj się z administracją serwera',
            });
            return;
        }
        const guild = yield client.guilds.fetch(event.guildId);
        const channel = (yield guild.channels.fetch(contentChannelId));
        if (!channel) {
            interaction.reply({ content: 'Wystąpił błąd po stronie serwera' });
            return;
        }
        const embed = yield (0, components_1.contentEmbed)(event, lang);
        const messageResult = yield channel.send({ embeds: [embed] });
        yield (0, entities_1.setContentChannelAndMessageId)(event, contentChannelId, messageResult.id);
        yield sendDMMessage(interaction, 'Wydarzenie zostało utworzone');
        yield generateReactions(messageResult, event);
        yield (0, handlers_1.contentReactionHandler)(messageResult, event.id, lang);
    }),
};
