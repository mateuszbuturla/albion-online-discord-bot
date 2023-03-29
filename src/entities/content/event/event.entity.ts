import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventStaus, IEventEntity } from '../../../types';
import { ContentTemplateEntity } from '../contentTemplate.entity';

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

  @ManyToOne(() => ContentTemplateEntity)
  @JoinTable()
  template: ContentTemplateEntity;
}
