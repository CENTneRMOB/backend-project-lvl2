#!/usr/bin/env node

import command from 'commander';
import gendiff from '../index.js';

const program = command;

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
