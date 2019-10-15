import { app, BrowserWindow } from 'electron';
import { join } from 'path';

let win: BrowserWindow | null = null;

function createWindow(): void {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(app.getAppPath(), 'preload.js'),
      nodeIntegration: true,
    },
    titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
    // frame: process.platform === 'darwin',
  });
  win.loadURL('https://netflix.com');

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
