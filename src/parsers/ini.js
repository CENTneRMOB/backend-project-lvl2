import ini from 'ini';
import _ from 'lodash';

const isNumber = (value) => {
  const number = parseFloat(value);
  return !Number.isNaN(number);
};

const printValue = (value) => {
  const num = parseFloat(value);
  return isNumber(num) ? num : value;
};

const transformObject = (object) => {
  const entries = Object.entries(object);
  const transformedEntries = entries.map(([key, value]) => {
    if (_.isObject(value)) {
      return [key, transformObject(value)];
    }
    if (isNumber(value)) {
      return [key, printValue(value)];
    }
    return [key, value];
  });
  return Object.fromEntries(transformedEntries);
};

export default (content) => transformObject(ini.parse(content));
