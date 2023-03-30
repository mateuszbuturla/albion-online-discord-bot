import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import {
  getContentTemplateById,
  getEventByUserIdWithStatusCreating,
  saveTemplateToEvent,
} from '../../entities';
import { IInteraction } from '../../types';

export const interaction: IInteraction = {
  name: 'template',
  run: async (client, interaction) => {
    const userId: string = interaction.user.id;
    const templateId: string = interaction.values[0];

    const event = await getEventByUserIdWithStatusCreating(userId);

    if (!event) {
      console.log('missing event');
      return;
    }

    const template = await getContentTemplateById(event.guildId, templateId);

    if (!template) {
      console.log('missing template');
      return;
    }

    const result = await saveTemplateToEvent(event, template);

    if (!result) {
      console.log('error');
      return;
    }

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
    const fourthActionRow: any = new ActionRowBuilder().addComponents(
      eventTime,
    );

    modal.addComponents(
      firstActionRow,
      thirdActionRow,
      fourthActionRow,
      secondActionRow,
    );

    await interaction.showModal(modal);

    await interaction.message.delete();
  },
};
