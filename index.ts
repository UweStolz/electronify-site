import logger from './cli/logger';
import * as ask from './cli/ask';
import {
  initialize, collectArgumentFromCli,
} from './cli/args';
import { Choices } from './util/values';
import buildArtifact from './builder/electronify';

function logGreeting(): void {
  logger.info('🔥🔥🔥🔥🔥🔥🔥🔥🔥');
  logger.info('Hello there..');
  logger.info('🔥🔥🔥🔥🔥🔥🔥🔥🔥');
}

function logFarewell(choices: Choices): void {
  logger.info('Your settings are:');
  logger.info(choices);
  logger.info('Have fun!');
}

export default async function execute(): Promise<void> {
  try {
    await initialize(process.argv);
    await logGreeting();

    const verboseFromCli = await collectArgumentFromCli('verbose');
    if (verboseFromCli) {
      logger.level = 'debug';
      process.env.DEBUG = 'electron-builder';
    }
    const urlFromCli = await collectArgumentFromCli('url');
    const osFromCli = await collectArgumentFromCli('os');
    const formatFromCli = await collectArgumentFromCli('format');
    const archFromCli = await collectArgumentFromCli('arch');

    const urlOfChoice = urlFromCli || await ask.forURL();
    const osOfChoice = osFromCli || await ask.forOS();
    const includeGenericFormats = (formatFromCli || osOfChoice === 'generic') ? false : await ask.forGenericFormats();
    const formatOfChoice = formatFromCli || await ask.forFormat(osOfChoice, includeGenericFormats);
    const architectureOfChoice = archFromCli || await ask.forArch();

    const choices: Choices = {
      url: urlOfChoice,
      os: osOfChoice,
      format: formatOfChoice,
      architecture: architectureOfChoice,
    };
    logger.info('Starting to build artifact');
    await buildArtifact(choices);
    logger.info('Finished building artifact');

    logFarewell(choices);
  } catch (error) {
    logger.error('An error occurred:');
    logger.error(error);
    process.exit(1);
  }
}
