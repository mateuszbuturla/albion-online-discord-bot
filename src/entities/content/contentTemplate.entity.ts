import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IContentTemplateEntity } from '../../types';

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
}
