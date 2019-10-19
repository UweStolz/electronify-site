import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import config from './config.json';

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
    // frame: process.platform === 'darwin',
  });
  win.loadURL(config.url);

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
