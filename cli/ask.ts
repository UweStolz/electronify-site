import inquirer from 'inquirer';
// @ts-ignore - There are no types available
import inquiererFuzzyPath from 'inquirer-fuzzy-path';
import { formatsForOs, architecture } from '../util/values';

inquirer.registerPrompt('fuzzypath', inquiererFuzzyPath);

function getFormatsForOs(os: string, includeGenericFormats?: inquirer.Answers|boolean): string[] {
  let formats: string[] = [];
  if (includeGenericFormats) {
    formats = formats.concat(formatsForOs[os], formatsForOs.generic);
  } else {
    formats = formatsForOs[os];
  }
  return formats;
}

function formatChoice(os: string, includeGenericFormats: inquirer.Answers|boolean): string[] {
  const formats: string[] = getFormatsForOs(os, includeGenericFormats);
  return formats;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ask(params: any): Promise<inquirer.Answers> {
  const answers = await inquirer.prompt({
    name: 'answer',
    ...params,
  });
  // @ts-ignore
  return answers ? answers.answer : {};
}

export async function forURL(): Promise <inquirer.Answers> {
  return ask({
    message: 'What is the URL to the website you want to wrap?',
    type: 'input',
    validate: (answer: { length: number }) => answer.length > 10,
  });
}

export async function forOS(): Promise<inquirer.Answers> {
  return ask({
    message: 'What is your operating system?',
    choices: ['macos', 'linux', 'windows'],
    type: 'list',
    validate: (answer: { length: number }) => answer.length > 0,
  });
}

export async function forGenericFormats(): Promise<inquirer.Answers> {
  return ask({
    message: 'Do you want to include generic formats?',
    type: 'confirm',
    validate: (answer: { length: number }) => answer.length > 0,
  });
}

export async function forFormat(os: inquirer.Answers|string, includeGenericFormats: inquirer.Answers|boolean): Promise<inquirer.Answers> {
  const osOfChoice = os as unknown as string;
  return ask({
    message: 'What format do you whish?',
    choices: formatChoice(osOfChoice, includeGenericFormats),
    type: 'list',
    validate: (answer: { length: number }) => answer.length > 0,
  });
}

export async function forArch(): Promise<inquirer.Answers> {
  return ask({
    message: 'What architecture is the package for?',
    choices: Object.values(architecture),
    type: 'list',
    validate: (answer: { length: number }) => answer.length > 0,
  });
}

export async function forCustomIcon(): Promise<inquirer.Answers> {
  return ask({
    message: 'Do you want to use an custom icon?',
    type: 'confirm',
    validate: (answer: { length: number }) => answer.length > 0,
  });
}

export async function forIcon(): Promise<inquirer.Answers> {
  return ask({
    type: 'fuzzypath',
    name: 'path',
    message: 'What is the path to the icon you whish to use?',
    itemType: 'file',
    default: `${process.cwd()}`,
    excludePath: (nodePath: string) => nodePath.startsWith('node_modules'),
    validate: (answer: string) => !!answer.endsWith('.png' || '.ico' || '.icns'),
  });
}
