import inquirer from 'inquirer';
import { formatsForOs, architecture } from '../util/values';

function getFormatsForOs(os: string, includeGenericFormats?: inquirer.Answers|boolean): string[] {
  let formats: string[] = [];
  if (includeGenericFormats) {
    // @ts-ignore
    formats = formats.concat(formatsForOs[os], formatsForOs.generic);
  } else {
    // @ts-ignore
    formats = formatsForOs[os];
  }
  return formats;
}

function formatChoice(os: string, includeGenericFormats: inquirer.Answers|boolean): string[]|undefined {
  let formats: string[]|undefined;
  switch (os) {
    case 'generic':
      formats = getFormatsForOs(os);
      break;
    case 'linux':
      formats = getFormatsForOs(os, includeGenericFormats);
      break;
    case 'macos':
      formats = getFormatsForOs(os, includeGenericFormats);
      break;
    case 'windows':
      formats = getFormatsForOs(os, includeGenericFormats);
      break;
    default:
      break;
  }
  return formats;
}


async function ask(params: inquirer.QuestionCollection): Promise<inquirer.Answers> {
  const answers = await inquirer.prompt({
    name: 'answer',
    ...params,
  });
  return answers ? answers.answer : {};
}

export async function forURL(): Promise <inquirer.Answers> {
  return ask({
    message: 'What is the URL to the website you want to wrap?',
    type: 'input',
    validate: (answer) => answer.length > 10,
  });
}

export async function forOS(): Promise<inquirer.Answers> {
  return ask({
    message: 'What is your operating system?',
    choices: ['macos', 'linux', 'windows'],
    type: 'list',
    validate: (answer) => answer.length > 0,
  });
}

export async function forGenericFormats(): Promise<inquirer.Answers> {
  return ask({
    message: 'Do you want to include generic formats?',
    type: 'confirm',
    validate: (answer) => answer.length > 0,
  });
}

export async function forFormat(os: inquirer.Answers|string, includeGenericFormats: inquirer.Answers|boolean): Promise<inquirer.Answers> {
  const osOfChoice = os as unknown as string;
  return ask({
    message: 'What format do you whish?',
    choices: formatChoice(osOfChoice, includeGenericFormats),
    type: 'list',
    validate: (answer) => answer.length > 0,
  });
}

export async function forArch(): Promise<inquirer.Answers> {
  return ask({
    message: 'What architecture is the package for?',
    choices: Object.values(architecture),
    type: 'list',
    validate: (answer) => answer.length > 0,
  });
}
