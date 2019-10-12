#!/usr/bin/env node

import * as yargs from 'yargs';

export default async function initialize(args: string[]): Promise<any> {
  // eslint-disable-next-line no-unused-expressions
  yargs
    .option('url', {
      alias: 'u',
      type: 'string',
      description: 'Your URL you want to build an archive for.',
    })
    .check((argument) => {
      if (argument.url) {
        const url = new URL(argument.url);
        return url;
      }
      return true;
    })
    .parse(args);
}
