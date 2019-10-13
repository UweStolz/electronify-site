
import builder from 'electron-builder';
import { Choices } from '../util/values';
import logger from '../cli/logger';

function getBaseName(url: string): string {
  const host = new URL(url).hostname;
  const baseName = host.substring(0, 4) === 'www.'
    ? host.substring(4, host.lastIndexOf('.'))
    : host.substring(0, host.lastIndexOf('.'));
  return baseName;
}

async function preprocessData(choices: Choices): Promise<Choices> {
  const OS: string = choices.os.toUpperCase();
  const name: string = getBaseName(choices.url);
  const data: Choices = {
    url: name,
    os: OS,
    format: choices.format,
    architecture: choices.architecture,
  };
  return data;
}

export default async function buildArtifact(choices: Choices): Promise<void> {
  const { Platform } = builder;
  const data = await preprocessData(choices);
  builder.build({
    // @ts-ignore
    targets: Platform[data.OS].createTarget(),
    config: {
      productName: data.url,
      appId: `com.electron.${data.url}`,
      artifactName: `electronify-${data.url}.${data.format}`,
    },
  })
    .then(() => {
    // handle result
    })
    .catch((error) => {
      logger.error('An error occurred while creating the artifact!');
      logger.error(error);
    });
}
