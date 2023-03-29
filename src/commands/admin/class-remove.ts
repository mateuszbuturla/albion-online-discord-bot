import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  deleteClass,
  getServerLanguage,
  getContentClassByName,
} from '../../entities';
import { ICommand, MessageType } from '../../types';

const args = [
  {
    name: 'command.class-delete.args.name',
    required: true,
  },
];

export const command: ICommand = {
  name: 'class-delete',
  descriptionKey: 'command.class-delete.help-description',
  aliases: [],
  args,
  adminOnly: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);

    const className = args[0];

    const contentClass = await getContentClassByName(
      message.guildId as string,
      className,
    );

    if (contentClass === null) {
      return error(message, {
        key: 'error.class-is-not-exist',
      });
    }

    const result = await deleteClass(contentClass);

    if (!result) {
      return error(message, {
        key: 'error.server-error',
      });
    }

    const embed = await generateEmbed({
      type: MessageType.SUCCESS,
      description: {
        key: 'command.class-delete.success',
        args: { className },
      },
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
