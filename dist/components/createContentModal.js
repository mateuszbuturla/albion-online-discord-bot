"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentModal = void 0;
const discord_js_1 = require("discord.js");
const createContentModal = () => {
    const modal = new discord_js_1.ModalBuilder()
        .setCustomId('submit-event')
        .setTitle('Tworzenie wydarzenia');
    const eventName = new discord_js_1.TextInputBuilder()
        .setCustomId('eventName')
        .setLabel('Nazwa wydarzenia')
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setMaxLength(20);
    const eventDescription = new discord_js_1.TextInputBuilder()
        .setCustomId('eventDescription')
        .setLabel('Opis wydarzenia')
        .setStyle(discord_js_1.TextInputStyle.Paragraph)
        .setMaxLength(200);
    const eventDate = new discord_js_1.TextInputBuilder()
        .setCustomId('eventDate')
        .setLabel('Data wydarzenia (dd-mm-rrrr)')
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setMinLength(10)
        .setMaxLength(10);
    const eventTime = new discord_js_1.TextInputBuilder()
        .setCustomId('eventTime')
        .setLabel('Godzina rozpoczęcia (hh:mm)')
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(5);
    const firstActionRow = new discord_js_1.ActionRowBuilder().addComponents(eventName);
    const secondActionRow = new discord_js_1.ActionRowBuilder().addComponents(eventDescription);
    const thirdActionRow = new discord_js_1.ActionRowBuilder().addComponents(eventDate);
    const fourthActionRow = new discord_js_1.ActionRowBuilder().addComponents(eventTime);
    modal.addComponents(firstActionRow, thirdActionRow, fourthActionRow, secondActionRow);
    return modal;
};
exports.createContentModal = createContentModal;
