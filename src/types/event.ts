import { ClientEvents, Interaction } from 'discord.js';
import Client from '../client';

interface Run {
  (client: Client, ...args: any[]): void;
}

export interface IEventClient {
  name: keyof ClientEvents;
  run: Run;
}

interface RunInteraction {
  (client: Client, interaction: any): void;
}

export interface IEventInteraction {
  name: keyof ClientEvents;
  run: RunInteraction;
}
