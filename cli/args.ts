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
      type: 'string',
      description: 'Your URL you want to build an archive for.',
    })
    .option('os', {
      alias: 'o',
      type: 'string',
      choices: Object.keys(formatsForOs),
      description: 'Your operating system.',
    })
    .option('format', {
      alias: 'f',
      type: 'string',
      choices: Object.values(allValidFormats),
      description: 'Your desired target format.',
    })
    .option('arch', {
      alias: 'a',
      type: 'string',
      choices: Object.values(architecture),
      description: 'The architecture of your system.',
    })
    .option('name', {
      alias: 'n',
      type: 'string',
      description: 'The name which should be used.',
    })
    .option('icon', {
      alias: 'i',
      type: 'string',
      description: 'The path to your icon you wish to use.',
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Activate DEBUG logging messages.',
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
