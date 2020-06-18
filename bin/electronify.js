#!/usr/bin/env node
var { resolve } = require('path');
var electronify = require(resolve(__dirname, "../index.js"));
electronify.default();
