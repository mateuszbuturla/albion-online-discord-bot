import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IContentRoleEntity } from '../../../types';

@Entity()
export class ContentRoleEntity
  extends BaseEntity
  implements IContentRoleEntity
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  guildId: string;

  @Column({ default: '' })
  name: string;
}
