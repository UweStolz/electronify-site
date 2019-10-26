import { writeJSON } from 'fs-extra';
import logger from './cli/logger';
import * as ask from './cli/ask';
import {
  initialize, collectArgumentsFromCli,
} from './cli/args';
import buildArtifact from './builder';
import exitProcess from './util/system';
import { formatsForOs } from './util/values';
import { getSpinner, setSpinnerState } from './util/spinner';

let shouldLogFarewell = false;

function logGreeting(): void {
  logger.info('🔥🔥🔥🔥🔥🔥🔥🔥🔥');
  logger.info('Hello there..');
  logger.info('🔥🔥🔥🔥🔥🔥🔥🔥🔥');
}

function logFarewell(): void {
  logger.info('Have fun!');
}

function matchingOsForFormat(givenFormat: string): undefined | string {
  let indexOf = -1;
  const osFormats = Object.values(formatsForOs);
  const osNames = Object.getOwnPropertyNames(formatsForOs);

  osFormats.forEach((formatForOs, index) => {
    formatForOs.forEach((formatInList) => {
      if (formatInList === givenFormat) { indexOf = index; }
    });
  });

  return (indexOf === 0) ? undefined : osNames[indexOf];
}

async function build(choices: Electronify.Choices): Promise<void> {
  const spinnerInstance = getSpinner({
    discardStdin: false,
    text: 'Generating package..',
  });
  let state = false;
  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  // @ts-ignore
  process.stdout.write = (): void => {};
  try {
    spinnerInstance.start();
    await buildArtifact(choices);
    spinnerInstance.text = 'Successfully finished building the artifact';
    logger.debug(choices, 'Your settings are:');
    state = true;
    shouldLogFarewell = true;
  } catch (err) {
    spinnerInstance.text = 'An error occurred while building the artifact!';
  } finally {
    process.stdout.write = originalStdoutWrite;
    setSpinnerState(spinnerInstance, state);
  }
}


export default async function execute(): Promise<void> {
  let osForGivenFormat;
  try {
    await initialize(process.argv);
    logGreeting();

    const argsFromCli = await collectArgumentsFromCli(['verbose', 'url', 'os', 'format', 'arch', 'name', 'icon']);
    if (argsFromCli.verbose) {
      logger.level = 'debug';
      process.env.DEBUG = 'electron-builder';
    }
    if (argsFromCli.format) {
      osForGivenFormat = matchingOsForFormat(argsFromCli.format);
    }

    const urlOfChoice = argsFromCli.url || await ask.forURL();
    const osOfChoice = osForGivenFormat || argsFromCli.os || await ask.forOS();
    const includeGenericFormats = (argsFromCli.format || osOfChoice === 'generic') ? false : await ask.forGenericFormats();
    const formatOfChoice = argsFromCli.format || await ask.forFormat(osOfChoice, includeGenericFormats);
    const architectureOfChoice = argsFromCli.arch || await ask.forArch();
    const nameOfChoice = argsFromCli.name || '';
    const includeCustomIcon = !argsFromCli.iconPath ? await ask.forCustomIcon() : false;
    const iconOfChoice = includeCustomIcon ? await ask.forIcon() : argsFromCli.iconPath as string;

    const choices: Electronify.Choices = {
      appName: nameOfChoice,
      architecture: architectureOfChoice,
      format: formatOfChoice,
      iconPath: iconOfChoice,
      os: osOfChoice,
      url: urlOfChoice,
    };
    await writeJSON('./app/config.json', { url: choices.url });
    await build(choices);
  } catch (error) {
    logger.error('An unexpected error occurred!');
    logger.error(error);
    exitProcess(1);
  } finally {
    if (shouldLogFarewell) { logFarewell(); }
  }
}
