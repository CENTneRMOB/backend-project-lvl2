#!/usr/bin/env node

import fs from 'fs';
import program from 'commander';
import genDiff from '../index.js';

program
  .version(`${JSON.parse(fs.readFileSync('../package.json', 'utf-8')).version}`)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
