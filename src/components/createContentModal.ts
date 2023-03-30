import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

export const createContentModal = (): ModalBuilder => {
  const modal = new ModalBuilder()
    .setCustomId('submit-event')
    .setTitle('Tworzenie wydarzenia');

  const eventName = new TextInputBuilder()
    .setCustomId('eventName')
    .setLabel('Nazwa wydarzenia')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(20);

  const eventDescription = new TextInputBuilder()
    .setCustomId('eventDescription')
    .setLabel('Opis wydarzenia')
    .setStyle(TextInputStyle.Paragraph)
    .setMaxLength(200);

  const eventDate = new TextInputBuilder()
    .setCustomId('eventDate')
    .setLabel('Data wydarzenia (dd-mm-rrrr)')
    .setStyle(TextInputStyle.Short)
    .setMinLength(10)
    .setMaxLength(10);

  const eventTime = new TextInputBuilder()
    .setCustomId('eventTime')
    .setLabel('Godzina rozpoczęcia (hh:mm)')
    .setStyle(TextInputStyle.Short)
    .setMinLength(5)
    .setMaxLength(5);

  const firstActionRow: any = new ActionRowBuilder().addComponents(eventName);
  const secondActionRow: any = new ActionRowBuilder().addComponents(
    eventDescription,
  );
  const thirdActionRow: any = new ActionRowBuilder().addComponents(eventDate);
  const fourthActionRow: any = new ActionRowBuilder().addComponents(eventTime);

  modal.addComponents(
    firstActionRow,
    thirdActionRow,
    fourthActionRow,
    secondActionRow,
  );

  return modal;
};
