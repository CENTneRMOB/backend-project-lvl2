import ini from 'ini';
import _ from 'lodash';

const stringNumberToNumber = (value) => (parseInt(value, 10) ? parseInt(value, 10) : value);

const correctedObject = (object) => {
  const result = {};
  const objectElements = _.toPairs(object);
  objectElements.forEach(([key, value]) => {
    if (!_.isObject(value)) {
      result[key] = stringNumberToNumber(value);
    } else {
      result[key] = correctedObject(value);
    }
  });

  return result;
};

export default (content) => correctedObject(ini.parse(content));
