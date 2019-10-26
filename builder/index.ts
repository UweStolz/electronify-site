import { build, Platform } from 'electron-builder';
import { resolve } from 'path';
import preprocessData from './preProcess';

const path = resolve();

export default async function buildArtifact(choices: Electronify.Choices): Promise<void> {
  const data = await preprocessData(choices);
  try {
    await build({
      config: {
        appId: `com.electron.${data.url}`,
        artifactName: `electronify-${data.url}.${data.format}`,
        directories: {
          app: `${path}/app`,
          buildResources: data.iconPath as string || undefined,
        },
        productName: data.appName || data.url as string,
      },
      // @ts-ignore
      targets: Platform[data.os].createTarget(data.format as string, data.architecture as number),
    });
  } catch (error) {
    throw Error();
  }
}
