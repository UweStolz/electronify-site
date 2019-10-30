// @ts-ignore
import prompt, { Options } from 'electron-prompt';

export default async function createPrompt(options?: Options, parentBrowserWindow?: Electron.BrowserWindow | undefined): Promise<string|null> {
  const promptInput = await prompt(options, parentBrowserWindow);
  return promptInput;
}
