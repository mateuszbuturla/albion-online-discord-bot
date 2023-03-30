import { createContentModal } from '../../components';
import {
  getContentTemplateById,
  getEventByUserIdWithStatusCreating,
  saveTemplateToEvent,
} from '../../entities';
import { IInteraction } from '../../types';

export const interaction: IInteraction = {
  name: 'template',
  run: async (client, interaction) => {
    const userId: string = interaction.user.id;
    const templateId: string = interaction.values[0];

    const event = await getEventByUserIdWithStatusCreating(userId);

    if (!event) {
      console.log('missing event');
      return;
    }

    const template = await getContentTemplateById(event.guildId, templateId);

    if (!template) {
      console.log('missing template');
      return;
    }

    const result = await saveTemplateToEvent(event, template);

    if (!result) {
      console.log('error');
      return;
    }

    const modal = createContentModal();

    await interaction.showModal(modal);

    await interaction.message.delete();
  },
};
