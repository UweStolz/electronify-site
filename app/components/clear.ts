import { session, BrowserWindow } from 'electron';
import { openMessageBox, openErrorBox } from './dialog';

async function cache(browserWindow: BrowserWindow): Promise<void> {
  try {
    await session.defaultSession.clearCache();
    await openMessageBox(browserWindow, {
      buttons: ['OK'],
      message: 'Cache was successfully cleared',
      title: 'Cache cleared',
      type: 'info',
    });
  } catch (err) {
    openErrorBox('An error occurred', 'Could not clear cache!');
  }
}

async function cookies(browserWindow: BrowserWindow): Promise<void> {
  try {
    await session.defaultSession.clearStorageData({ storages: ['cookies'] });
    await openMessageBox(browserWindow, {
      buttons: ['OK'],
      message: 'Cookies were successfully cleared',
      title: 'Cookies cleared',
      type: 'info',
    });
  } catch (err) {
    openErrorBox('occurred', 'Could not clear cookies!');
  }
}

export default {
  cache,
  cookies,
};
