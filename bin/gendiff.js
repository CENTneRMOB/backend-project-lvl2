#!/usr/bin/env node

import command from 'commander';

const program = command;

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.');

program.parse(process.argv);
