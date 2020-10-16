import ini from 'ini';
import _ from 'lodash';

const isNumeric = (value) => {
  const number = parseFloat(value);
  return !Number.isNaN(number);
};

const transformObject = (object) => _.mapValues(object, (value) => {
  if (_.isObject(value)) {
    return transformObject(value);
  }
  if (isNumeric(value)) {
    return parseFloat(value);
  }
  return value;
});

export default (content) => transformObject(ini.parse(content));
