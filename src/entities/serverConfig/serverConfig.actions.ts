import { Language } from '../../types';
import { ServerConfigEntity } from './serverConfig.entity';

export const generateServerRecord = async (
  guildId: string,
): Promise<ServerConfigEntity> => {
  const server = await ServerConfigEntity.findOne({ where: { guildId } });

  if (!server) {
    const newServer = new ServerConfigEntity();
    newServer.guildId = guildId;
    return await newServer.save();
  }

  return server;
};

export const getServerLanguage = async (guildId: string): Promise<Language> => {
  const findServer = await ServerConfigEntity.findOne({ where: { guildId } });

  if (!findServer) {
    return Language.pl;
  }

  return findServer.lang;
};

export const getServerContentChannel = async (
  guildId: string,
): Promise<string | null> => {
  const findServer = await ServerConfigEntity.findOne({ where: { guildId } });

  if (!findServer || !findServer.contentChannelId) {
    return null;
  }

  return findServer.contentChannelId;
};

export const changeServerLanguage = async (
  guildId: string,
  lang: Language,
): Promise<boolean> => {
  const findServer = await ServerConfigEntity.findOne({ where: { guildId } });

  if (!findServer) {
    return false;
  }

  findServer.lang = lang;

  await findServer.save();

  return true;
};

export const setContentChannelId = async (
  guildId: string,
  channelId: string,
): Promise<boolean> => {
  const findServer = await ServerConfigEntity.findOne({ where: { guildId } });

  if (!findServer) {
    return false;
  }

  findServer.contentChannelId = channelId;

  await findServer.save();

  return true;
};

export const setContentCategoryId = async (
  guildId: string,
  contentCategoryId: string,
): Promise<boolean> => {
  const findServer = await ServerConfigEntity.findOne({ where: { guildId } });

  if (!findServer) {
    return false;
  }

  findServer.contentCategoryId = contentCategoryId;

  await findServer.save();

  return true;
};

export const getServerContentCategory = async (
  guildId: string,
): Promise<string | null> => {
  const findServer = await ServerConfigEntity.findOne({ where: { guildId } });

  if (!findServer || !findServer.contentCategoryId) {
    return null;
  }

  return findServer.contentCategoryId;
};
