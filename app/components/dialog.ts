import { dialog, MessageBoxOptions, BrowserWindow } from 'electron';

export async function openMessageBox(browserWindow: BrowserWindow, options: MessageBoxOptions): Promise<void> {
  await dialog.showMessageBox(browserWindow, options);
}

export function openErrorBox(title: string, content: string): void {
  dialog.showErrorBox(title, content);
}
