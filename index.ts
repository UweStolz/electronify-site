import logger from './cli/logger';
import * as ask from './cli/ask';
import {
  initialize, collectArgumentsFromCli,
} from './cli/args';
import { Choices } from './util/values';
import buildArtifact from './builder';

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

    const argsFromCli = await collectArgumentsFromCli(['verbose', 'url', 'os', 'format', 'arch']);
    if (argsFromCli.verbose) {
      logger.level = 'debug';
      process.env.DEBUG = 'electron-builder';
    }

    const urlOfChoice = argsFromCli.url || await ask.forURL();
    const osOfChoice = argsFromCli.os || await ask.forOS();
    const includeGenericFormats = (argsFromCli.format || osOfChoice === 'generic') ? false : await ask.forGenericFormats();
    const formatOfChoice = argsFromCli.format || await ask.forFormat(osOfChoice, includeGenericFormats);
    const architectureOfChoice = argsFromCli.arch || await ask.forArch();

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
