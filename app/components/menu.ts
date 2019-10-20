import {
  Menu, MenuItemConstructorOptions, MenuItem,
} from 'electron';

function buildMenuTemplate(): (MenuItemConstructorOptions | MenuItem)[] {
  const template: (MenuItemConstructorOptions | MenuItem)[] = [
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
      ],
    },
  ];
  return template;
}


export default function buildeMenu(): void {
  const template = buildMenuTemplate();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
