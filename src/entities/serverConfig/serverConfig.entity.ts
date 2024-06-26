import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IServerConfigEntity, Language } from '../../types';

@Entity()
export class ServerConfigEntity
  extends BaseEntity
  implements IServerConfigEntity
{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: '' })
  guildId: string;

  @Column({ type: 'enum', enum: Language, default: Language.pl })
  lang: Language;

  @Column({ default: null, nullable: true })
  contentChannelId: string;

  @Column({ default: null, nullable: true })
  contentCategoryId: string;
}
