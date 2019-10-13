import logger from './cli/logger';
import * as ask from './cli/ask';
import {
  initialize, collectArgumentFromCli,
} from './cli/args';

type Choices = {
  url: string;
  os: string;
  format: string;
  architecture: string;
}

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
    if (verboseFromCli) logger.level = 'debug';
    const urlFromCli = await collectArgumentFromCli('url');
    const osFromCli = await collectArgumentFromCli('os');
    const formatFromCli = await collectArgumentFromCli('format');
    const archFromCli = await collectArgumentFromCli('arch');

    const urlOfChoice = urlFromCli || await ask.forURL();
    const osOfChoice = osFromCli || await ask.forOS();
    const includeGenericFormats = (formatFromCli || osOfChoice === 'generic') ? false : await ask.forGenericFormats();
    const formatOfChoice = formatFromCli || await ask.forFormat(osOfChoice, includeGenericFormats);
    const architectureOfChoice = archFromCli || await ask.forArch();

    logFarewell({
      url: urlOfChoice,
      os: osOfChoice,
      format: formatOfChoice,
      architecture: architectureOfChoice,
    });
  } catch (error) {
    logger.error('An error occurred:');
    logger.error(error);
    process.exit(1);
  }
}
