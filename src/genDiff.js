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
    if ((_.isObject(value1) && _.isObject(value2))
    && (!Array.isArray(value1) && !Array.isArray(value2))) {
      return { type: markers.NESTED, key, children: makeDiff(value1, value2) };
    }

    return {
      type: markers.CHANGED, key, value1, value2,
    };
  });

  return differences;
};

const readFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
};

const getExtension = (filePath) => {
  const extension = path.extname(filePath);
  return extension;
};

const getFullPath = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  return fullPath;
};

export default (filePath1, filePath2, outputFormat) => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);

  const content1 = readFile(fullPath1);
  const content2 = readFile(fullPath2);

  const fileFormat1 = getExtension(fullPath1);
  const fileFormat2 = getExtension(fullPath2);

  const parser1 = chooseParser(fileFormat1);
  const parser2 = chooseParser(fileFormat2);

  const object1 = parser1(content1);
  const object2 = parser2(content2);

  const differences = makeDiff(object1, object2);

  return formatDiffToOutputFormat(differences, outputFormat);
};
