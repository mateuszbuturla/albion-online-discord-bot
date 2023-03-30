import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IParticipantEntity } from '../../../types';
import { ContentClassEntity } from '../class';
import { EventEntity } from '../event';

@Entity()
export class ContentParticipantEntity
  extends BaseEntity
  implements IParticipantEntity
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  guildId: string;

  @Column({ default: '' })
  userId: string;

  @Column({ default: '' })
  userName: string;

  @ManyToOne(() => ContentClassEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  selectedClass: ContentClassEntity;

  @ManyToOne(() => EventEntity, { onDelete: 'CASCADE' })
  event: EventEntity;
}
