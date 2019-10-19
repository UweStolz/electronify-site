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

function validateUrl(givenUrl: string): URL|false {
  try {
    const url = new URL(givenUrl);
    return url;
  } catch (err) {
    return false;
  }
}

export async function initialize(args: string[]): Promise<void> {
  // eslint-disable-next-line no-unused-expressions
  program = yargs
    .locale('en')
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
        throw new Error('Invalid URL!');
      }
      return true;
    })
    .help('help')
    .parse(args);
}
