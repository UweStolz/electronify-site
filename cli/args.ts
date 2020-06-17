#!/usr/bin/env node

import yargs from 'yargs';
import {
  formatsForOs, allValidFormats, architecture,
} from '../util/values';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let program: any;

export async function collectArgumentsFromCli(argumentsToCollect: string[]): Promise<Electronify.Args> {
  const argumentsFromCli: Electronify.Args = {};
  argumentsToCollect.forEach((argument: string) => {
    argumentsFromCli[argument] = program[argument];
  });
  return argumentsFromCli;
}

function validateUrl(givenUrl: string): boolean {
  try {
    const url = new URL(givenUrl);
    return !!(url.protocol === 'https:' || url.protocol === 'http:');
  } catch (err) {
    return false;
  }
}

function validateOsAndFormat(OS: string, format: string): boolean {
  const validFormatForOs = formatsForOs[OS].find((element) => element === format);
  const validFormatForGeneric = formatsForOs.generic.find((element) => element === format);
  return !!((validFormatForOs || validFormatForGeneric));
}

export async function initialize(args: string[]): Promise<void> {
  // eslint-disable-next-line no-unused-expressions
  program = yargs
    .locale('en')
    .option('auto',
      {
        alias: 'A',
        description: 'Use automatic mode',
        conflicts: [
          'os', 'format', 'arch', 'name', 'icon',
        ],
        type: 'boolean',
      })
    .option('url', {
      alias: 'u',
      description: 'Your URL you want to build an archive for.',
      type: 'string',
    })
    .option('os', {
      alias: 'o',
      choices: Object.keys(formatsForOs),
      description: 'Your operating system.',
      type: 'string',
    })
    .option('format', {
      alias: 'f',
      choices: Object.values(allValidFormats),
      description: 'Your desired target format.',
      type: 'string',
    })
    .option('arch', {
      alias: 'a',
      choices: Object.values(architecture),
      description: 'The architecture of your system.',
      type: 'string',
    })
    .option('name', {
      alias: 'n',
      description: 'The name which should be used.',
      type: 'string',
    })
    .option('icon', {
      alias: 'i',
      description: 'The path to your icon you wish to use.',
      type: 'string',
    })
    .option('verbose', {
      alias: 'v',
      description: 'Activate DEBUG logging messages.',
      type: 'boolean',
    })
    .check((argument) => {
      if (argument.url) {
        if (validateUrl(argument.url)) {
          return true;
        }
        throw new Error(`Invalid URL! ${argument.url}`);
      } else if (argument.os && argument.format) {
        if (validateOsAndFormat(argument.os, argument.format)) {
          return true;
        }
        throw new Error(
          `OS and format do not match!
Valid formats for "${argument.os}" are:
${formatsForOs[argument.os]}
${formatsForOs.generic}`,
        );
      }
      return true;
    })
    .help('help')
    .parse(args);
}
