import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers/index.js';
import format from './formatters/index.js';
import makeDiff from './makeDiff.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(getFullPath(filePath), 'utf-8');

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const content1 = readFile(filePath1);
  const content2 = readFile(filePath2);

  const fileFormat1 = _.trim(path.extname(filePath1), '.');
  const fileFormat2 = _.trim(path.extname(filePath2), '.');

  const object1 = parse(fileFormat1, content1);
  const object2 = parse(fileFormat2, content2);

  const differences = makeDiff(object1, object2);

  return format(differences, outputFormat);
};
