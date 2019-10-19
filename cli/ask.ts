import inquirer from 'inquirer';
// @ts-ignore - There are no types available
import inquiererFuzzyPath from 'inquirer-fuzzy-path';
import { imageSize } from 'image-size';
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

function validateIcon(path: string): boolean {
  if (!path.endsWith('.png' || '.icns')) return false;
  const dimensions = imageSize(path);
  if (dimensions.width !== 512 || dimensions.height !== 512) return false;
  return true;
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
    choices: ['linux', 'macos', 'windows'],
    message: 'What is your operating system?',
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
    choices: formatChoice(osOfChoice, includeGenericFormats),
    message: 'What format do you whish?',
    type: 'list',
    validate: (answer: { length: number }) => answer.length > 0,
  });
}

export async function forArch(): Promise<inquirer.Answers> {
  return ask({
    choices: Object.values(architecture),
    message: 'What architecture is the package for?',
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
    default: `${process.cwd()}`,
    itemType: 'file',
    message: 'What is the path to the icon you whish to use?',
    name: 'path',
    type: 'fuzzypath',
    excludePath: (nodePath: string) => nodePath.startsWith('node_modules'),
    validate: (answer: string) => validateIcon(answer),
  });
}
