import logger from './cli/logger';
import * as ask from './cli/ask';
import {
  initialize, collectArgumentFromCli,
} from './cli/args';

type Choices = {
  url: string;
  os: string;
  format: string;
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

    const urlFromCli = await collectArgumentFromCli('url');
    const osFromCli = await collectArgumentFromCli('os');
    const formatFromCli = await collectArgumentFromCli('format');

    if (!urlFromCli) await ask.forURL();
    const osOfChoice = osFromCli || await ask.forOS();
    const includeGenericFormats = formatFromCli ? false : await ask.forGenericFormats();
    if (!formatFromCli) await ask.forFormat(osOfChoice, includeGenericFormats);

    logFarewell({ url: urlFromCli, os: osFromCli, format: formatFromCli });
  } catch (error) {
    logger.error('An error occurred:');
    logger.error(error);
    process.exit(1);
  }
}
