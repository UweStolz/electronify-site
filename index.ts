/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeJSON } from 'fs-extra';
import { join } from 'path';
import logger from './cli/logger';
import * as ask from './cli/ask';
import {
  initialize, collectArgumentsFromCli,
} from './cli/args';
import buildArtifact from './builder';
import exitProcess from './util/system';
import { formatsForOs } from './util/values';
import { getSpinner, setSpinnerState } from './util/spinner';
import downloadAndResizeIcon from './util/icon';

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  process.stdout.write = (): void => {};
  try {
    spinnerInstance.start();
    logger.debug(choices, 'Settings:');
    await buildArtifact(choices);
    spinnerInstance.text = 'Successfully finished building the artifact';
    state = true;
  } catch (err) {
    spinnerInstance.text = 'An error occurred while building the artifact!';
    if (logger.level === 'debug') {
      logger.error(err);
    }
  } finally {
    process.stdout.write = originalStdoutWrite;
    setSpinnerState(spinnerInstance, state);
  }
}

async function collectChoices(cliArgs: Electronify.Args, osForGivenFormat: string|undefined, skipChoices: boolean): Promise<Electronify.Choices> {
  let urlOfChoice: any;
  let osOfChoice: any;
  let includeGenericFormats: any;
  let formatOfChoice: any;
  let architectureOfChoice: any;
  let nameOfChoice: any;
  let includeCustomIcon: any;
  let iconOfChoice: any;

  if (skipChoices) {
    urlOfChoice = cliArgs.url || await ask.forURL();
    const { platform } = process;
    await downloadAndResizeIcon(urlOfChoice, platform);
  } else {
    urlOfChoice = cliArgs.url || await ask.forURL();
    osOfChoice = osForGivenFormat || cliArgs.os || await ask.forOS();
    includeGenericFormats = (cliArgs.format || osOfChoice === 'generic') ? false : await ask.forGenericFormats();
    formatOfChoice = cliArgs.format || await ask.forFormat(osOfChoice, includeGenericFormats);
    architectureOfChoice = cliArgs.arch || await ask.forArch();
    nameOfChoice = cliArgs.name || await ask.forName();
    includeCustomIcon = !cliArgs.iconPath ? await ask.forCustomIcon() : false;
    if (includeCustomIcon) {
      iconOfChoice = osOfChoice === 'linux' ? await ask.forIconFolder() : await ask.forIconPath();
    } else {
      await downloadAndResizeIcon(urlOfChoice, osOfChoice);
    }
  }

  const useAutoMode = cliArgs.auto as unknown as boolean;

  const choices: Electronify.Choices = {
    auto: useAutoMode,
    appName: nameOfChoice,
    architecture: architectureOfChoice,
    format: formatOfChoice,
    iconPath: iconOfChoice,
    os: osOfChoice,
    url: urlOfChoice,
  };

  return choices;
}

export default async function execute(): Promise<void> {
  let osForGivenFormat;
  let skipChoices = false;
  try {
    await initialize(process.argv);

    const argsFromCli = await collectArgumentsFromCli([
      'auto', 'verbose', 'url', 'os', 'format', 'arch', 'name', 'icon',
    ]);
    if (argsFromCli.verbose) {
      logger.level = 'debug';
      process.env.DEBUG = 'electron-builder';
    }
    if (argsFromCli.format) {
      osForGivenFormat = matchingOsForFormat(argsFromCli.format);
    }
    if (argsFromCli.auto) {
      skipChoices = true;
    }
    const choices = await collectChoices(argsFromCli, osForGivenFormat, skipChoices);
    const configPath = join(__dirname, 'app/config.json');
    await writeJSON(configPath, { url: choices.url });
    await build(choices);
  } catch (error) {
    logger.error('An unexpected error occurred!');
    logger.error(error);
    exitProcess(1);
  }
}
