import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventStaus, IEventEntity } from '../../../types';
import { ContentTemplateEntity } from '../contentTemplate.entity';
import { ContentParticipantEntity } from '../participant';

@Entity()
export class EventEntity extends BaseEntity implements IEventEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  guildId: string;

  @Column({ default: '' })
  authorId: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'enum', enum: EventStaus, default: EventStaus.creating })
  status: EventStaus;

  @Column({ default: '' })
  author: string;

  @ManyToOne(() => ContentTemplateEntity)
  @JoinTable()
  template: ContentTemplateEntity;

  @OneToMany(() => ContentParticipantEntity, (participant) => participant.event)
  @JoinTable()
  participants: ContentParticipantEntity[];
}
