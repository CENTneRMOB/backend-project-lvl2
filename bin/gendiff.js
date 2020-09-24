#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import program from 'commander';
import genDiff from '../index.js';

const pkgContent = fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8');
const { version } = JSON.parse(pkgContent);

program
  .version(`${version}`)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
