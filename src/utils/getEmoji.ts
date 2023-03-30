import { GuildEmoji, Message } from 'discord.js';

export const getEmoji = (
  message: Message,
  emojiName: string,
): GuildEmoji | undefined => {
  return message.guild?.emojis.cache.find((emoji) => emoji.name === emojiName);
};
