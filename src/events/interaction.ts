import { Events } from 'discord.js';
import { IEventInteraction, IInteraction } from '../types';

export const event: IEventInteraction = {
  name: Events.InteractionCreate,
  run: (client, interaction) => {
    try {
      const findInteraction = client.interactions.get(interaction.customId);

      (findInteraction as IInteraction).run(client, interaction);
    } catch (e) {
      console.log(e);
    }
  },
};
