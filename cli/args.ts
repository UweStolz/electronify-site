#!/usr/bin/env node

import yargs from 'yargs';
import {
  formatsForOs, allValidFormats, architecture, Args,
} from '../util/values';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let program: any;

export async function collectArgumentsFromCli(argumentsToCollect: string[]): Promise<Args> {
  const argumentsFromCli: Args = {};
  argumentsToCollect.forEach((argument: string) => {
    argumentsFromCli[argument] = program[argument];
  });
  return argumentsFromCli;
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
      desciption: 'The architecture of your system.',
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      desciption: 'Activate DEBUG logging messages.',
    })
    .check((argument) => {
      if (argument.url) {
        const url = new URL(argument.url);
        return url;
      }
      return true;
    })
    .help('help')
    .parse(args);
}
