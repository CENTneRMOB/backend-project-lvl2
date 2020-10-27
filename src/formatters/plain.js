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

const stringifyPath = (path) => path.join('.');

const mapping = {
  add: (path, item) => `Property '${stringifyPath(path)}' was added with value: ${stringify(item.value)}`,
  remove: (path) => `Property '${stringifyPath(path)}' was removed`,
  equal: () => [],
  changed: (path, item) => `Property '${stringifyPath(path)}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`,
  nested: (path, item, iter) => iter(item.children, path),
};

const plain = (diff) => {
  const iter = (nodeItems, parents) => nodeItems.flatMap((item) => {
    const path = [...parents, item.key];
    return mapping[item.type](path, item, iter);
  });

  return iter(diff, []).join('\n');
};

export default plain;
