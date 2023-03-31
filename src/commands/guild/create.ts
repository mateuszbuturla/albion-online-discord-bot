import { generateEmbed } from '../../utils';
import { ICommand, MessageType } from '../../types';
import {
  ContentTemplateEntity,
  createEvent,
  getAllTemplates,
  getServerLanguage,
} from '../../entities';
import { ActionRowBuilder, SelectMenuBuilder } from 'discord.js';
import { error } from '../../components';

const getSelectTemplateOptions = (templates: ContentTemplateEntity[]) => {
  return templates.map((item) => ({ label: item.name, value: `${item.id}` }));
};

export const command: ICommand = {
  name: 'create',
  descriptionKey: 'command.create.help-description',
  aliases: [],
  run: async (client, message) => {
    const lang = await getServerLanguage(message.guildId as string);

    const templates = await getAllTemplates(message.guildId as string);

    if (templates.length === 0) {
      return error(message, {
        key: 'error.server-error',
      });
    }

    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
      new SelectMenuBuilder()
        .setCustomId('template')
        .setPlaceholder('Nothing selected')
        .addOptions(getSelectTemplateOptions(templates)),
    );

    const result = await createEvent(
      message.guildId as string,
      message.author.id,
      message.member?.displayName ?? message.author.username,
    );

    if (!result) {
      return error(message, {
        key: 'error.server-error',
      });
    }

    const embed = await generateEmbed({
      type: MessageType.SUCCESS,
      description: { key: 'command.create.description-template-select' },
      lang,
    });

    message.author.send({ embeds: [embed], components: [row] });

    message.delete();
  },
};
