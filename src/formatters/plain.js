import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const stringifyKeys = (keys) => keys.join('.');

const mapping = {
  add: (keys, item) => `Property '${stringifyKeys(keys)}' was added with value: ${stringify(item.value)}`,
  remove: (keys) => `Property '${stringifyKeys(keys)}' was removed`,
  equal: () => [],
  changed: (keys, item) => `Property '${stringifyKeys(keys)}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`,
};

const plain = (diff) => {
  const iter = (nodeItems, parents) => nodeItems.flatMap((item) => {
    const keys = [...parents, item.key];
    if (item.type !== 'nested') {
      return mapping[item.type](keys, item);
    }

    return iter(item.children, keys);
  });

  return iter(diff, []).join('\n');
};

export default plain;
