import logger from './cli/logger';
import * as ask from './cli/ask';
import initialize from './cli/args';

function logGreeting(): void {
  logger.info('🔥🔥🔥🔥🔥🔥🔥🔥🔥');
  logger.info('Hello there..');
  logger.info('🔥🔥🔥🔥🔥🔥🔥🔥🔥');
}

function logFarewell(): void {
  logger.info('Have fun!');
}

export default async function execute(): Promise<void> {
  try {
    await initialize(process.argv);
    await logGreeting();
    await ask.default();
    logFarewell();
  } catch (error) {
    logger.error(error);
  }
}
