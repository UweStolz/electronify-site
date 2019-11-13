import { session } from 'electron';

async function cache(): Promise<void> {
  await session.defaultSession.clearCache();
}

async function cookies(): Promise<void> {
  await session.defaultSession.clearStorageData({ storages: ['cookies'] });
}

export default {
  cache,
  cookies,
};
