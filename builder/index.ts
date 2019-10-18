import { build, Platform } from 'electron-builder';
import { resolve } from 'path';
import logger from '../cli/logger';
import preprocessData from './preProcess';

const path = resolve();

export default async function buildArtifact(choices: Electronify.Choices): Promise<void> {
  const data = await preprocessData(choices);
  try {
    await build({
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
