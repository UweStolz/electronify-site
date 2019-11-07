import {
  Menu, MenuItemConstructorOptions, MenuItem,
} from 'electron';
import setUserAgent from './userAgent';
import createPrompt from './prompt';

let browserWindow: Electron.BrowserWindow;

function buildMenuTemplate(): (MenuItemConstructorOptions | MenuItem)[] {
  const template: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      label: 'Tools',
      submenu: [
        {
          label: 'Clear cookies',
          click: (): void => {},
        },
        {
          label: 'Clear cache',
          click: (): void => {},
        },
      ],
    },
    {
      label: 'User-Agent',
      submenu: [
        {
          label: 'Desktop',
          type: 'normal',
          click: (): void => { setUserAgent({ deviceCategory: 'desktop' }, browserWindow); },
        },
        {
          label: 'Mobile',
          type: 'normal',
          click: (): void => { setUserAgent({ deviceCategory: 'mobile' }, browserWindow); },
        },
        {
          label: 'Custom',
          type: 'normal',

          click: async (): Promise<void> => {
            const customUserAgent = await createPrompt(undefined, browserWindow);
            if (typeof customUserAgent === 'string') {
              const regex = new RegExp(customUserAgent);
              setUserAgent(regex, browserWindow);
            }
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          accelerator: 'CmdOrCtrl+Z',
          label: 'Undo',
          role: 'undo',
        },
        {
          accelerator: 'CmdOrCtrl+X',
          label: 'Cut',
          role: 'cut',
        },
        {
          accelerator: 'CmdOrCtrl+C',
          label: 'Copy',
          role: 'copy',
        },
        {
          accelerator: 'CmdOrCtrl+V',
          label: 'Paste',
          role: 'paste',
        },
        {
          accelerator: 'CmdOrCtrl+A',
          label: 'Select All',
          role: 'selectAll',
        },
      ],
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          accelerator: 'CmdOrCtrl+M',
          label: 'Minimize',
          role: 'minimize',
        },
        {
          accelerator: 'CmdOrCtrl+W',
          label: 'Close',
          role: 'close',
        },
        {
          label: 'Reload',
          role: 'reload',
        },
      ],
    },
  ];
  return template;
}

export default function buildeMenu(currentWindow: Electron.BrowserWindow): void {
  browserWindow = currentWindow;
  const template = buildMenuTemplate();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
