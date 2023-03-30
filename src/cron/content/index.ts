import { addHours, differenceInMinutes } from 'date-fns';
import { EventStaus } from '../../types';
import {
  EventEntity,
  getAllInProgressContents,
  getAllPendingContents,
} from '../../entities';
import { MessageManager } from 'discord.js';

const sendDMReminder = async (event: EventEntity) => {
  await event.participants.forEach(async (participant) => {
    if (participant.reminderSent) {
      return;
    }

    const user = await globalThis.client.users.fetch(participant.userId);

    if (!user) {
      return;
    }

    user.send({
      content:
        'Przymonienie! Za mnie niż 30 minut rozpoczyna się wydarzenie, na które jesteś zapisany(a)',
    });

    participant.reminderSent = true;
    await participant.save(); // @TODO
  });
};

export const CRONContent = async () => {
  const pendingEvents = await getAllPendingContents();

  pendingEvents.forEach(async (event) => {
    const splitDate = event.date.split('-');
    const splitTime = event.time.split(':');

    const contentDate = new Date(
      Number(splitDate[2]),
      Number(splitDate[1]) - 1,
      Number(splitDate[0]),
      Number(splitTime[0]),
      Number(splitTime[1]),
      0,
    );
    const now = addHours(new Date(), 2);

    if (differenceInMinutes(contentDate, now) < 30) {
      await sendDMReminder(event);
    }

    if (differenceInMinutes(contentDate, now) < 0) {
      event.status = EventStaus.inProgrss;

      await event.save(); // @TODO
    }
  });

  const inProgessEvents = await getAllInProgressContents();

  console.log(inProgessEvents);

  inProgessEvents.forEach(async (event) => {
    const splitDate = event.date.split('-');
    const splitTime = event.time.split(':');

    const contentDate = new Date(
      Number(splitDate[2]),
      Number(splitDate[1]) - 1,
      Number(splitDate[0]),
      Number(splitTime[0]),
      Number(splitTime[1]),
      0,
    );
    const now = addHours(new Date(), 2);

    if (differenceInMinutes(contentDate, now) < -30) {
      event.status = EventStaus.done;

      await event.save(); // @TODO

      const channel = await globalThis.client.channels.fetch(event.channelId);

      if (!channel) {
        return;
      }

      const dd = (await (channel as any).messages) as MessageManager;

      const msg = await dd.fetch(event.messageId);

      if (!msg) {
        return;
      }

      await msg.delete(); // @TODO
    }
  });
};
