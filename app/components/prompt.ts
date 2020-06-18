// @ts-ignore
import prompt, { Options } from 'electron-prompt';
import { openErrorBox } from './dialog';

export default async function createPrompt(options?: Options, parentBrowserWindow?: Electron.BrowserWindow | undefined):
Promise<string|null> {
  let promptInput: null|string = null;
  try {
    promptInput = await prompt(options, parentBrowserWindow);
  } catch (err) {
    openErrorBox('Error', 'Could not set UserAgent!');
  }
  return promptInput;
}
