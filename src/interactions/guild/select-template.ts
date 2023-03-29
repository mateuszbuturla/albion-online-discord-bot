import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { generateEmbed } from '../../utils';
import {
  getContentTemplateById,
  getEventByUserIdWithStatusCreating,
  saveTemplateToEvent,
} from '../../entities';
import { IInteraction, Language, MessageType } from '../../types';

export const interaction: IInteraction = {
  name: 'template',
  run: async (client, interaction) => {
    console.log(interaction);

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
      .setStyle(TextInputStyle.Short);

    const eventDescription = new TextInputBuilder()
      .setCustomId('eventDescription')
      .setLabel('Opis wydarzenia')
      .setStyle(TextInputStyle.Paragraph);

    const eventDate = new TextInputBuilder()
      .setCustomId('eventDate')
      .setLabel('Data wydarzenia (dd-mm-rrrr)')
      .setStyle(TextInputStyle.Short);

    const eventTime = new TextInputBuilder()
      .setCustomId('eventTime')
      .setLabel('Godzina rozpoczęcia (hh:mm)')
      .setStyle(TextInputStyle.Short);

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
