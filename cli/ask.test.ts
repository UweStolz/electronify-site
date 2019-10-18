/* eslint-disable @typescript-eslint/no-explicit-any */
import * as inquirer from 'inquirer';
import * as imageSize from 'image-size';
import * as ask from './ask';

jest.mock('image-size');
jest.mock('inquirer-fuzzy-path');
jest.mock('inquirer');

test('ask.forUrl', async () => {
  const prompt = jest.spyOn(inquirer, 'prompt').mockImplementationOnce((): any => ({ answer: 'http://www.example.com' }));
  const url = await ask.forURL();
  expect(prompt).toHaveBeenCalled();
  expect(url).toBe('http://www.example.com');
});

test('ask.forOs', async () => {
  const prompt = jest.spyOn(inquirer, 'prompt').mockImplementationOnce((): any => ({ answer: 'linux' }));
  const os = await ask.forOS();
  expect(prompt).toHaveBeenCalled();
  expect(os).toBe('linux');
});

test('ask.forFormat', async () => {
  const prompt = jest.spyOn(inquirer, 'prompt').mockImplementationOnce((): any => ({ answer: 'appimage' }));
  const format = await ask.forFormat('linux', false);
  expect(prompt).toHaveBeenCalled();
  expect(format).toBe('appimage');
});

test('ask.forArch', async () => {
  const prompt = jest.spyOn(inquirer, 'prompt').mockImplementationOnce((): any => ({ answer: 'x64' }));
  const arch = await ask.forArch();
  expect(prompt).toHaveBeenCalled();
  expect(arch).toBe('x64');
});

test('ask.forCustomIcon', async () => {
  const prompt = jest.spyOn(inquirer, 'prompt').mockImplementationOnce((): any => ({ answer: true }));
  const includeCustomIcon = await ask.forCustomIcon();
  expect(prompt).toHaveBeenCalled();
  expect(includeCustomIcon).toBe(true);
});

test('ask.forIcon', async () => {
  const prompt = jest.spyOn(inquirer, 'prompt').mockImplementationOnce((): any => ({ answer: './some/path.png' }));
  jest.spyOn(imageSize, 'imageSize').mockImplementationOnce(() => ({ width: 512, height: 512 }));
  const iconPath = await ask.forIcon();

  expect(prompt).toHaveBeenCalled();
  expect(iconPath).toBe('./some/path.png');
});
