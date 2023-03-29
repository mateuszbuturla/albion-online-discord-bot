import { generateEmbed } from '../../utils';
import {
  finishEventCreation,
  getEventByUserIdWithStatusCreating,
  getServerLanguage,
  ServerConfigEntity,
} from '../../entities';
import { IInteraction, MessageType } from '../../types';
import { TextChannel } from 'discord.js';

export const interaction: IInteraction = {
  name: 'submit-event',
  run: async (client, interaction) => {
    const userId: string = interaction.user.id;
    const eventName = interaction.fields.getTextInputValue('eventName');
    const eventDescription =
      interaction.fields.getTextInputValue('eventDescription');
    const eventDate = interaction.fields.getTextInputValue('eventDate');
    const eventTime = interaction.fields.getTextInputValue('eventTime');

    const event = await getEventByUserIdWithStatusCreating(userId);

    if (!event) {
      console.log('missing event');
      return;
    }

    const result = await finishEventCreation(
      event,
      eventName,
      eventDescription,
    );

    if (!result) {
      return;
    }

    const lang = await getServerLanguage(event.guildId);

    const serverConfig = await ServerConfigEntity.findOne({
      where: { guildId: event.guildId },
    });

    if (!serverConfig || !serverConfig.contentChannelId) {
      return;
    }

    await interaction.reply({
      content: 'Wydarzenie zostało utworzone',
    });

    const guild = await client.guilds.fetch(event.guildId);

    const channel = (await guild.channels.fetch(
      serverConfig.contentChannelId,
    )) as TextChannel;

    const embed = await generateEmbed({
      type: MessageType.INFORMATION,
      customTitle: result.name,
      description: {
        key: 'content.description',
        args: {
          customDescription: result.description,
          id: result.id,
          nick: result.author,
        },
      },
      lang,
    });

    embed.addFields(
      { name: '📅 Data', value: eventDate, inline: true },
      { name: '🕑 Godzina', value: eventTime, inline: true },
      { name: '👥 Grupa', value: eventTime, inline: true },
    );

    if (!channel) {
      return;
    }

    channel.send({ embeds: [embed] });
  },
};
