import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IContentClassEntity } from '../../../types';

@Entity()
export class ContentClassEntity
  extends BaseEntity
  implements IContentClassEntity
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  guildId: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  emoji: string;
}
