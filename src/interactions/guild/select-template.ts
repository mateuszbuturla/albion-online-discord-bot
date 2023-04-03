import { createContentModal, error } from '../../components';
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
      interaction.reply({ content: 'Wystąpił błąd po stronie serwera' });
      return;
    }

    console.log('GUILD ID:', event.guildId);
    console.log('TEMPLATE ID:', templateId);

    const template = await getContentTemplateById(event.guildId, templateId);

    console.log(template);

    if (!template) {
      interaction.reply({ content: 'Szablon nie istnieje' });
      return;
    }

    const result = await saveTemplateToEvent(event, template);

    if (!result) {
      interaction.reply({ content: 'Wystąpił błąd po stronie serwera' });
      return;
    }

    const modal = createContentModal();

    await interaction.showModal(modal);

    await interaction.message.delete();
  },
};
