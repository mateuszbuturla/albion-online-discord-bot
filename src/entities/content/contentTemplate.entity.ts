import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IContentTemplateEntity } from '../../types';
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

  @ManyToMany(() => ContentRoleEntity)
  @JoinTable()
  roles: ContentRoleEntity[];
}
