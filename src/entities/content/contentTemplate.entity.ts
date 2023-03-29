import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IContentTemplateEntity } from '../../types';
import { ContentClassEntity } from './class';
import { ContentRoleEntity } from './role';

@Entity()
export class ContentTemplateEntity
  extends BaseEntity
  implements IContentTemplateEntity
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  guildId: string;

  @Column({ default: '' })
  name: string;

  @ManyToMany(() => ContentRoleEntity, { onDelete: 'CASCADE' })
  @JoinTable()
  roles: ContentRoleEntity[];

  @ManyToMany(() => ContentClassEntity, { onDelete: 'CASCADE' })
  @JoinTable()
  classes: ContentClassEntity[];
}
