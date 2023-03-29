import { generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  ContentClassEntity,
  getAllClasses,
  getAllRoles,
  getServerLanguage,
} from '../../entities';
import { ICommand, MessageType } from '../../types';

const getListOfClassesAsString = (classes: ContentClassEntity[]): string => {
  return classes.map((x) => '`' + x.name + '`').join(' | ');
};

export const command: ICommand = {
  name: 'class-list',
  descriptionKey: 'command.class-list.help-description',
  aliases: [],
  adminOnly: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);

    const result = await getAllClasses(message.guildId as string);

    if (!result || result.length === 0) {
      return error(message, {
        key: 'error.class-list-is-empty',
      });
    }

    const classesListField = {
      name: {
        key: 'command.class-list.class-list',
        args: { count: result.length },
      },
      value: getListOfClassesAsString(result),
    };

    const embed = await generateEmbed({
      type: MessageType.INFORMATION,
      fields: [classesListField],
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
