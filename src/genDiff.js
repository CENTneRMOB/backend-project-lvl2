import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import chooseParser from './parsers/index.js';
import formatDiffToOutputFormat from './formatters/index.js';

const markers = {
  ADD: 'add',
  REMOVE: 'remove',
  EQUAL: 'equal',
  CHANGED: 'changed',
  NESTED: 'nested',
};

const makeDiff = (obj1, obj2) => {
  const unionOfKeys = _.union(_.keys(obj1), _.keys(obj2)).sort();

  const differences = unionOfKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return { type: markers.REMOVE, key, value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { type: markers.ADD, key, value: obj2[key] };
    }
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      return { type: markers.EQUAL, key, value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: markers.NESTED, key, children: makeDiff(value1, value2) };
    }

    return {
      type: markers.CHANGED, key, value1, value2,
    };
  });

  return differences;
};

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);

export default (filePath1, filePath2, outputFormat) => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);

  const content1 = fs.readFileSync(fullPath1, 'utf-8');
  const content2 = fs.readFileSync(fullPath2, 'utf-8');

  const fileFormat1 = path.extname(fullPath1);
  const fileFormat2 = path.extname(fullPath2);

  const parseFirstFile = chooseParser(fileFormat1);
  const parseSecondFile = chooseParser(fileFormat2);

  const object1 = parseFirstFile(content1);
  const object2 = parseSecondFile(content2);

  const differences = makeDiff(object1, object2);

  return formatDiffToOutputFormat(differences, outputFormat);
};
