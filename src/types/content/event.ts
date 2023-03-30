export enum EventStaus {
  creating = 'creating',
  pending = 'pending',
  inProgrss = 'inProgress',
  done = 'done',
}

export interface IEventEntity {
  id: string;
  guildId: string;
  authorId: string;
  name: string;
  description: string;
  status: EventStaus;
  author: string;
  date: string;
  time: string;
  channelId: string;
  messageId: string;
}
