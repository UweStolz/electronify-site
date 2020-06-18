#!/usr/bin/env node
const { join } = require('path');
const path = join(__dirname, '..');
const index = `${path}/index`;
const electronify = require(index);

electronify.default();
