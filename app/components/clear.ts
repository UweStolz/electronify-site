import { session, BrowserWindow } from 'electron';
import capitalize from 'lodash.capitalize';
import invoke from 'lodash.invoke';
import { openMessageBox, openErrorBox } from './dialog';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function clear(browserWindow: BrowserWindow, desc: string, func: string, ...args: any[]): Promise<void> {
  try {
    const description = capitalize(desc);
    await invoke(session.defaultSession, `${func}`, args);
    await openMessageBox(browserWindow, {
      buttons: ['OK'],
      message: `${description} successfully cleared`,
      title: `${description} cleared`,
      type: 'info',
    });
  } catch (err) {
    openErrorBox('An error occurred', `Could not clear ${desc}!`);
  }
}
