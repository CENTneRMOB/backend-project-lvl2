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

export default (diff) => {
  const iter = (node, parents) => node.flatMap((item) => {
    const mapping = {
      add: (keys) => `Property '${keys.join('.')}' was added with value: ${transformValueToString(item.value)}`,
      remove: (keys) => `Property '${keys.join('.')}' was removed`,
      equal: () => null,
      changed: (keys) => `Property '${keys.join('.')}' was updated. From ${transformValueToString(item.value1)} to ${transformValueToString(item.value2)}`,
      nested: (keys, key) => iter(item.children, [...parents, key]),
    };
    const { type, key } = item;
    const keys = [...parents, key];
    return mapping[type](keys, key);
  });

  return iter(diff, []).filter((item) => item).join('\n');
};
