import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers/index.js';
import format from './formatters/index.js';

const markers = {
  ADD: 'add',
  REMOVE: 'remove',
  EQUAL: 'equal',
  CHANGED: 'changed',
  NESTED: 'nested',
};

const makeDiff = (obj1, obj2) => {
  const unionOfKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  return unionOfKeys.map((key) => {
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
};

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);

export default (filePath1, filePath2, outputFormat) => {
  const content1 = fs.readFileSync(getFullPath(filePath1), 'utf-8');
  const content2 = fs.readFileSync(getFullPath(filePath2), 'utf-8');

  const fileFormat1 = _.trim(path.extname(filePath1), '.');
  const fileFormat2 = _.trim(path.extname(filePath2), '.');

  const object1 = parse(fileFormat1, content1);
  const object2 = parse(fileFormat2, content2);

  const differences = makeDiff(object1, object2);

  return format(differences, outputFormat);
};
