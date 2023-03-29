import { generateEmbed } from '../../utils';
import {
  finishEventCreation,
  getEventByUserIdWithStatusCreating,
} from '../../entities';
import { IInteraction, Language, MessageType } from '../../types';
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

    await interaction.reply({
      content: 'Wydarzenie zostało utworzone',
    });

    const guild = await client.guilds.fetch(event.guildId);

    const channelId = '1090579034221576204';

    const channel = (await guild.channels.fetch(channelId)) as TextChannel;

    const embed = await generateEmbed({
      type: MessageType.INFORMATION,
      customTitle: result.name,
      description: {
        key: 'content.description',
        args: { customDescription: result.description, id: result.id },
      },
      lang: Language.pl,
    });

    if (!channel) {
      return;
    }

    channel.send({ embeds: [embed] });
  },
};
