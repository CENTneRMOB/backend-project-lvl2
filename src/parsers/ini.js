import ini from 'ini';
import _ from 'lodash';

const transformStrNumberToNumber = (value) => (parseFloat(value) ? parseFloat(value) : value);

const correctObject = (object) => {
  const result = Object.fromEntries(
    Object.entries(object).map(([key, value]) => (_.isObject(value) ? [key, correctObject(value)]
      : [key, transformStrNumberToNumber(value)])),
  );

  return result;
};

export default (content) => correctObject(ini.parse(content));
