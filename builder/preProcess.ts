import os from 'os';
import { resolve } from 'path';

function getBaseName(url: string): string {
  const host = new URL(url).hostname;
  const baseName = host.substring(0, 4) === 'www.'
    ? host.substring(4, host.lastIndexOf('.'))
    : host.substring(0, host.lastIndexOf('.'));
  return baseName;
}

function setDefaultOptions(choices: Electronify.Choices): Electronify.Choices {
  const nameFromUrl: string = getBaseName(choices.url as string);
  let currentOS: string;
  let formatForOS: string;
  switch (os.platform()) {
    case 'darwin':
      currentOS = 'macos';
      formatForOS = 'dmg';
      break;
    case 'win32':
      currentOS = 'windows';
      formatForOS = 'portable';
      break;
    case 'linux':
      currentOS = 'linux';
      formatForOS = 'appimage';
      break;
    default:
      currentOS = '';
      formatForOS = '.zip';
      break;
  }

  const defaultOptions: Electronify.Choices = {
    auto: choices.auto,
    appName: choices.appName,
    architecture: '',
    format: formatForOS,
    iconPath: resolve(),
    os: currentOS,
    url: nameFromUrl,
  };
  return defaultOptions;
}

function setCustomOptions(choices: Electronify.Choices): Electronify.Choices {
  const OS: string = choices.os.toUpperCase();
  const nameFromUrl: string = getBaseName(choices.url as string);
  const pathToIcon: string = choices.iconPath as string;
  const archMap = {
    ia32: 0,
    x64: 1,
    armv7l: 2,
    arm64: 3,
  };
  // @ts-ignore
  const arch: number = archMap[choices.architecture];
  const customOptions: Electronify.Choices = {
    auto: choices.auto,
    appName: choices.appName,
    architecture: arch,
    format: choices.format,
    iconPath: pathToIcon,
    os: OS,
    url: nameFromUrl,
  };
  return customOptions;
}

export default async function preprocessData(choices: Electronify.Choices): Promise<Electronify.Choices> {
  let data;
  if (choices.auto) {
    data = setDefaultOptions(choices);
  } else {
    data = setCustomOptions(choices);
  }
  return data;
}
