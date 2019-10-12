#!/usr/bin/env node

import * as yargs from 'yargs';

// eslint-disable-next-line no-unused-expressions
yargs
  .command('build', 'Build an archive for your desired website.')
  .option('url', {
    alias: 'u',
    type: 'string',
    description: 'Your URL you want to build an archive for.',
  })
  .check((argument) => {
    let url;
    if (argument.url) {
      url = new URL(argument.url);
    }
    return url;
  })
  .argv;
