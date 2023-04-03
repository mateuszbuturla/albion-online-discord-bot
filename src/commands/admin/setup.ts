import { generateEmbed } from '../../utils';
import {
  getServerLanguage,
  setContentCategoryId,
  setContentChannelId,
} from '../../entities';
import { ICommand, BotModules, MessageType } from '../../types';
import { GuildChannel } from 'discord.js';

const args = [
  {
    name: 'command.setup.args.module',
    required: true,
  },
];

export const command: ICommand = {
  name: 'setup',
  descriptionKey: 'command.setup.help-description',
  aliases: [],
  args,
  adminOnly: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);
    const module = args[0];

    const parseModule = BotModules[module as BotModules];

    if (parseModule === BotModules.content) {
      const result = await setContentChannelId(
        message.guildId as string,
        message.channelId,
      );

      const embed = await generateEmbed({
        type: MessageType.SUCCESS,
        description: { key: 'command.setup.content.success' },
        lang,
      });

      const parent = (message.channel as GuildChannel).parent;

      if (parent) {
        await setContentCategoryId(message.guildId as string, parent.id);
      }

      message.channel.send({ embeds: [embed] });
    }
  },
};
