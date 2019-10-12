#!/usr/bin/env node

import yargs from 'yargs';
import { formatsForOs, allValidFormats } from '../util/values';

export default async function initialize(args: string[]): Promise<any> {
  // eslint-disable-next-line no-unused-expressions
  yargs
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
