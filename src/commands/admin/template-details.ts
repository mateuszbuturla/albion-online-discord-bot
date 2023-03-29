import { Fields, generateEmbed } from '../../utils';
import { error } from '../../components';
import {
  ContentClassEntity,
  ContentRoleEntity,
  getContentTemplateByName,
  getServerLanguage,
} from '../../entities';
import { ICommand, MessageType } from '../../types';

const args = [
  {
    name: 'command.template-details.args.name',
    required: true,
  },
];

const getListOfRolesAsString = (roles: ContentRoleEntity[]): string => {
  return roles.map((x) => '`' + x.name + '`').join(' | ');
};

const getListOfClassesAsString = (classes: ContentClassEntity[]): string => {
  return classes.map((x) => '`' + x.name + '`').join(' | ');
};

export const command: ICommand = {
  name: 'template-details',
  descriptionKey: 'command.template-create.help-description',
  aliases: [],
  args,
  adminOnly: true,
  run: async (client, message, args) => {
    const lang = await getServerLanguage(message.guildId as string);

    const name = args[0];

    const template = await getContentTemplateByName(
      message.guildId as string,
      name,
    );

    if (template === null) {
      return error(message, {
        key: 'error.template-with-provided-name-is-exist',
      });
    }

    const rolesListField = {
      name: {
        key: 'command.template-details.roles-list',
        args: { count: template.roles.length },
      },
      value: getListOfRolesAsString(template.roles) ?? '',
    };

    const classesListField = {
      name: {
        key: 'command.template-details.classes-list',
        args: { count: template.classes.length },
      },
      value: getListOfClassesAsString(template.classes) ?? '',
    };

    let fields: any = [];

    if (template.roles.length > 0) {
      fields = [...fields, rolesListField];
    }

    if (template.classes.length > 0) {
      fields = [...fields, classesListField];
    }

    const embed = await generateEmbed({
      type: MessageType.INFORMATION,
      description: {
        key: 'command.template-details.description',
        args: { name },
      },
      fields,
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
