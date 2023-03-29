import { generateEmbed } from '../../utils';
import { getServerLanguage, setContentChannelId } from '../../entities';
import { ICommand, BotModules, MessageType } from '../../types';

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

      message.channel.send({ embeds: [embed] });
    }
  },
};
