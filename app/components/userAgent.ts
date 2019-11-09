
import { session, BrowserWindow } from 'electron';
// @ts-ignore
import UserAgent from 'user-agents';
import { openErrorBox, openMessageBox } from './dialog';

interface UserAgentOptions {
  appName?: string;
  connection?: object;
  cpuClass?: string;
  deviceCategory?: 'desktop'|'mobile'|'tablet';
  oscpu?: string;
  platform?: string;
  pluginsLength?: number;
  screenHeight?: number;
  screenWidth?: number;
  vendor?: 'Google Inc.'|'Apple Computer, Inc.'|'';
  userAgent?: string;
  viewportHeight?: number;
  viewportWidth?: number;
}

export default async function setUserAgent(userAgentOptions: UserAgentOptions|RegExp, parentWindow: BrowserWindow): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userAgent: any;
  try {
    userAgent = new UserAgent(userAgentOptions);
    await openMessageBox(parentWindow, {
      buttons: ['OK'],
      message: 'The User-Agent was successfully set.',
      title: 'User-Agent changed',
      type: 'info',
    });
  } catch (err) {
    openErrorBox('Invalid User-Agent', 'The given User-Agent was not valid!');
    return;
  }
  if (session.defaultSession) {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      details.requestHeaders['User-Agent'] = userAgent.toString();
      callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
  }
}
