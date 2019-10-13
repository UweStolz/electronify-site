#!/usr/bin/env node

import yargs, { } from 'yargs';
import { formatsForOs, allValidFormats } from '../util/values';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let program: any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function collectArgumentFromCli(argument: string): Promise<any> {
  return program[argument];
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
