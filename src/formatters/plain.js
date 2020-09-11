import _ from 'lodash';

const markers = {
  ADD: 'add',
  REMOVE: 'remove',
  EQUAL: 'equal',
  CHANGED: 'changed',
  NESTED: 'nested',
};

const returningValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const removingString = (concatedKeys) => `Property '${concatedKeys}' was removed`;
const addingString = (concatedKeys, addedValue) => `Property '${concatedKeys}' was added with value: ${returningValue(addedValue)}`;
const changingString = (concatedKeys, oldValue, newValue) => `Property '${concatedKeys}' was updated. From ${returningValue(oldValue)} to ${returningValue(newValue)}`;

export default (diff) => {
  const iter = (node, concatedKeys) => node.map((item) => {
    const { type, key } = item;
    const keys = [...concatedKeys, key];
    if (type === markers.ADD) {
      return addingString(keys.join('.'), item.value);
    }
    if (type === markers.REMOVE) {
      return removingString(keys.join('.'));
    }
    if (type === markers.CHANGED) {
      return changingString(keys.join('.'), item.value1, item.value2);
    }
    if (type === markers.EQUAL) {
      return 0;
    }

    return iter(item.children, [...concatedKeys, key]);
  });

  return iter(diff, []).flat(Infinity).filter((item) => item !== 0).join('\n');
};
