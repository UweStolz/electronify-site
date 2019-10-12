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
    await ask.forURL();
    const osOfChoice = await ask.forOS();
    const includeGenericFormats = await ask.forGenericFormats();
    await ask.forFormat(osOfChoice, includeGenericFormats);
    logFarewell();
  } catch (error) {
    logger.error('An error occurred:');
    logger.error(error);
    process.exit(1);
  }
}
