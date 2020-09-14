import _ from 'lodash';
import getContent from './parsers/index.js';
import formatter from './formatters/index.js';

const markers = {
  ADD: 'add',
  REMOVE: 'remove',
  EQUAL: 'equal',
  CHANGED: 'changed',
  NESTED: 'nested',
};

const makeDiff = (obj1, obj2) => {
  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);

  const unionOfKeys = _.uniq(keysOfObj1.concat(keysOfObj2)).sort();

  const mappedKeys = unionOfKeys.map((key) => {
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
    if (_.isObject(value1) && _.isObject(value2)) {
      return { type: markers.NESTED, key, children: makeDiff(value1, value2) };
    }

    return {
      type: markers.CHANGED, key, value1, value2,
    };
  });

  return mappedKeys;
};

export default (filePath1, filePath2, outputFormat) => {
  const [obj1, obj2] = getContent(filePath1, filePath2);
  const diff = makeDiff(obj1, obj2);
  return formatter(diff, outputFormat);
};
