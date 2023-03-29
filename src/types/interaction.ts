import Client from '../client';
import { Interaction } from 'discord.js';

interface Run {
  (client: Client, interaction: any): void;
}
export interface IInteraction {
  name: string;
  run: Run;
}
