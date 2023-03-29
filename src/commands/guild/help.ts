import { getServerLanguage } from '../../entities';
import { Collection, Message } from 'discord.js';
import { generateEmbed } from '../../utils';
import { getPrefix } from '../../helpers';
import { ICommand, MessageType } from '../../types';
import Client from '../../client';
import { error } from '../../components';

const getListOfCommandsAsString = (
  commands: Collection<string, ICommand>,
): string => {
  const prefix = getPrefix();
  return commands.map((x) => '`' + prefix + x.name + '`').join(' | ');
};

const sendCommandList = async (client: Client, message: Message) => {
  const prefix = getPrefix();
  const commands = client.commands;
  const lang = await getServerLanguage(message.guildId as string);

  const commandListField = {
    name: {
      key: 'command.help.command-list',
      args: { count: commands.size },
    },
    value: getListOfCommandsAsString(commands),
  };

  const embed = await generateEmbed({
    type: MessageType.INFORMATION,
    description: { key: 'command.help.description', args: { prefix } },
    fields: [commandListField],
    lang,
  });

  message.channel.send({ embeds: [embed] });
};

const sendSpecyficCommandDescription = async (
  client: Client,
  message: Message,
  commandName: string,
) => {
  const prefix = getPrefix();
  const lang = await getServerLanguage(message.guildId as string);

  const command =
    client.commands.get(commandName) || client.aliases.get(commandName);

  if (!command) {
    return error(message, {
      key: 'error.command-not-found',
      args: { prefix },
    });
  }

  if (!command.descriptionKey) {
    const embed = await generateEmbed({
      type: MessageType.ERROR,
      description: {
        key: 'error.command-no-description',
        args: { command: `${prefix}${commandName}` },
      },
      lang,
    });
    return message.channel.send({ embeds: [embed] });
  }

  const commandDescriptionField = {
    name: `${prefix}${command.name}`,
    value: { key: command.descriptionKey },
  };

  const embed = await generateEmbed({
    type: MessageType.INFORMATION,
    fields: [commandDescriptionField],
    lang,
  });

  message.channel.send({ embeds: [embed] });
};

export const command: ICommand = {
  name: 'help',
  descriptionKey: 'command.help.help-description',
  aliases: [],
  run: async (client, message, args) => {
    if (args.length === 0) {
      return await sendCommandList(client, message);
    }

    return await sendSpecyficCommandDescription(client, message, args[0]);
  },
};
