
import builder from 'electron-builder';
import { Choices } from '../util/values';

const { Platform } = builder;

export default async function buildArtifact(choices: Choices): Promise<void> {
  builder.build({
    targets: Platform.LINUX.createTarget(),
    config: {
      productName: 'someName',
    },
  })
    .then(() => {
    // handle result
    })
    .catch((error) => {
    // handle error
    });
}
