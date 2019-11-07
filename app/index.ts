import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import config from './config.json';
import buildMenu from './components/menu';

let win: BrowserWindow | null = null;

function createWindow(): void {
  win = new BrowserWindow({
    height: 600,
    width: 800,
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
    webPreferences: {
      nodeIntegration: true,
      preload: join(app.getAppPath(), 'preload.js'),
    },
  });
  win.loadURL(config.url);

  buildMenu(win);

  win.on('closed', (): void => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (win === null) createWindow();
});
