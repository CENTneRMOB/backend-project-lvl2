import _ from 'lodash';

const transformValueToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const mapping = {
  add: (keys, item) => `Property '${keys.join('.')}' was added with value: ${transformValueToString(item.value)}`,
  remove: (keys) => `Property '${keys.join('.')}' was removed`,
  equal: () => [],
  changed: (keys, item) => `Property '${keys.join('.')}' was updated. From ${transformValueToString(item.value1)} to ${transformValueToString(item.value2)}`,
};

const plain = (diff) => {
  const iter = (node, parents) => node.flatMap((item) => {
    const keys = [...parents, item.key];
    if (item.type !== 'nested') {
      return mapping[item.type](keys, item);
    }

    return iter(item.children, keys);
  });

  return iter(diff, []).filter(Boolean).join('\n');
};

export default plain;
