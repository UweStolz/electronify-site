
import * as builder from 'electron-builder';
import { resolve } from 'path';
import logger from '../cli/logger';

const path = resolve();

function getBaseName(url: string): string {
  const host = new URL(url).hostname;
  const baseName = host.substring(0, 4) === 'www.'
    ? host.substring(4, host.lastIndexOf('.'))
    : host.substring(0, host.lastIndexOf('.'));
  return baseName;
}

async function preprocessData(choices: Electronify.Choices): Promise<Electronify.Choices> {
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
  const data: Electronify.Choices = {
    appName: choices.appName,
    url: nameFromUrl,
    os: OS,
    format: choices.format,
    architecture: arch,
    iconPath: pathToIcon,
  };
  return data;
}

export default async function buildArtifact(choices: Electronify.Choices): Promise<void> {
  const { Platform } = builder;
  const data = await preprocessData(choices);
  try {
    await builder.build({
      // @ts-ignore
      targets: Platform[data.os].createTarget(data.format as string, data.architecture as number),
      config: {
        directories: {
          app: `${path}/app`,
          buildResources: data.iconPath as string || null,
        },
        productName: data.appName || data.url as string,
        appId: `com.electron.${data.url}`,
        artifactName: `electronify-${data.url}.${data.format}`,
      },
    });
  } catch (error) {
    logger.error('An error occurred while creating the artifact!');
    logger.error(error);
  }
}
